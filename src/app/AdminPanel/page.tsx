"use client";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaBars,
  FaTimes,
  FaChartLine,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBan,
  FaTruck,
  FaThumbsUp,
} from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [filters, setFilters] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  useEffect(() => {
    setIsMounted(true);
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    const ordersQuery = `*[_type == "order"]{
      _id,
      order_date,
      status,
      customer->{
        _id,
        name,
        email,
        phone
      },
      items[] {
        productname,
        productprice,
        productdescription,
        quantity,
        selectedSize,
        selectedColor,
        selectedSpec,
        selectedGraphicCard,
        selectedStorage
      }
    }`;

    const ordersResponse = await client.fetch(ordersQuery);
    setOrders(ordersResponse);
    setFilteredOrders(ordersResponse);

    const revenue = ordersResponse.reduce((acc: number, order: any) => {
      return (
        acc +
        order.items.reduce((itemAcc: number, item: any) => {
          return itemAcc + item.productprice * item.quantity;
        }, 0)
      );
    }, 0);
    setTotalRevenue(revenue);

    const monthlyData = calculateMonthlyRevenue(ordersResponse);
    setMonthlyRevenue(monthlyData);
  };

  const calculateMonthlyRevenue = (orders: any[]) => {
    const monthlyRevenueMap: { [key: string]: number } = {};

    orders.forEach((order) => {
      const month = new Date(order.order_date).toLocaleString("default", { month: "short" });
      const revenue = order.items.reduce((acc: number, item: any) => acc + item.productprice * item.quantity, 0);

      if (monthlyRevenueMap[month]) {
        monthlyRevenueMap[month] += revenue;
      } else {
        monthlyRevenueMap[month] = revenue;
      }
    });

    return Object.keys(monthlyRevenueMap).map((month) => ({
      month,
      revenue: monthlyRevenueMap[month],
    }));
  };

  const fetchProducts = async () => {
    const productsQuery = `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      image {
        asset->{
          _ref,
          url
        }
      }
    }`;

    const productsResponse = await client.fetch(productsQuery);
    setProducts(productsResponse);
  };

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilters(searchTerm);

    const filtered = orders.filter((order) => {
      return (
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order._id.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredOrders(filtered);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");

  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await client.delete(orderId);
      toast.success("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.");
    }
  };

  const handleApproveOrder = async (orderId: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: "Approved" })
        .commit();
      toast.success("Order approved successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error approving order:", error);
      toast.error("Failed to approve order.");
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: "Delivered" })
        .commit();
      toast.success("Order marked as delivered!");
      fetchOrders();
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("Failed to complete order.");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: "Cancelled" })
        .commit();
      toast.success("Order cancelled successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order.");
    }
  };

  const handlePendingOrder = async (orderId: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: "Pending" })
        .commit();
      toast.success("Order status updated to Pending!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const handleDeliveredOrder = async (orderId: string) => {
    try {
      await client
        .patch(orderId)
        .set({ status: "Delivered" })
        .commit();
      toast.success("Order status updated to Delivered!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await client.delete(productId);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

  const handleSaveProduct = async () => {
    try {
      await client
        .patch(editingProduct._id)
        .set({
          name: editingProduct.name,
          price: editingProduct.price,
          description: editingProduct.description,
        })
        .commit();
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex overflow-hidden">
      <ToastContainer />
      {!isLoggedIn ? (
        <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-900 text-center mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Updated Sidebar */}
          <div
            className={`bg-gradient-to-b from-blue-800 to-blue-900 w-64 min-h-screen shadow-2xl transform transition-all duration-300 fixed ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-64"
            }`}
          >
            <div className="p-6">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Sidebar Metrics */}
              <div className="space-y-4">
                <div className="bg-blue-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-300">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{orders.length}</p>
                </div>
                <div className="bg-blue-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-blue-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-300">Total Products</p>
                  <p className="text-2xl font-bold text-white">{products.length}</p>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-700">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">Admin User</p>
                    <p className="text-xs text-gray-400">ahmedmemon3344@gmail.com</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-white hover:bg-blue-700 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 p-6 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            {/* Toggle Button */}
            <header className="flex justify-between items-center mb-8">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-200"
              >
                {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </header>

            {/* Analytics Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Total Orders</h3>
                  <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Total Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800">Total Products</h3>
                  <p className="text-3xl font-bold text-purple-600">{products.length}</p>
                </div>
              </div>
            </div>

            {/* Monthly Revenue Graph */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
              <LineChart width={800} height={300} data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </div>

            {/* Orders Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    onChange={handleSearch}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Customer Name</th>
                        <th className="px-4 py-3">Order Date</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="px-4 py-3">{order._id}</td>
                          <td className="px-4 py-3">{order.customer.name}</td>
                          <td className="px-4 py-3">{new Date(order.order_date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Approved"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-2">
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => handlePendingOrder(order._id)}
                              className="text-yellow-500 hover:text-yellow-700"
                            >
                              Pending
                            </button>
                            <button
                              onClick={() => handleDeliveredOrder(order._id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              Delivered
                            </button>
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaBan />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= filteredOrders.length}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 pt-64 overflow-auto flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Customer Information</h3>
                      <p className="text-gray-600"><FaUser className="inline mr-2" />{selectedOrder.customer.name}</p>
                      <p className="text-gray-600"><FaEnvelope className="inline mr-2" />{selectedOrder.customer.email}</p>
                      <p className="text-gray-600"><FaPhone className="inline mr-2" />{selectedOrder.customer.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Order Information</h3>
                      <p className="text-gray-600">Order ID: {selectedOrder._id}</p>
                      <p className="text-gray-600">Order Date: {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
                      <p className="text-gray-600">Status: {selectedOrder.status}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Products</h3>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div key={index} className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-gray-800 font-medium">{item.productname}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-gray-600">Price: ${item.productprice}</p>
                            <p className="text-gray-600">Size: {item.selectedSize}</p>
                            <p className="text-gray-600">Color: {item.selectedColor}</p>
                            <p className="text-gray-600">Spec: {item.selectedSpec}</p>
                            <p className="text-gray-600">Graphic Card: {item.selectedGraphicCard}</p>
                            <p className="text-gray-600">Storage: {item.selectedStorage}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  try {
                    // Fetch the image URL directly from the query
                    const imageUrl = product.image?.asset?.url;

                    return (
                      <div
                        key={product._id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        {/* Display the image directly from the query */}
                        <img
                          src={imageUrl} // Use the image URL directly
                          alt={product.name}
                          className="w-full h-48 object-contain rounded-lg mb-4"
                        />
                        <p className="text-gray-600">Price: ${product.price}</p>
                      </div>
                    );
                  } catch (error) {
                    console.error("Error rendering product:", error);
                    return null; // Skip rendering this product if an error occurs
                  }
                })}
              </div>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Product</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Name</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Price</label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Description</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProduct}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;