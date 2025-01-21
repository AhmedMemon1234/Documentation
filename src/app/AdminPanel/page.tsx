"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { client } from "@/sanity/lib/client";

const AdminPanel = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [filters, setFilters] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false); // Track whether the component is mounted

  // Ensure the component is mounted before accessing localStorage
  useEffect(() => {
    setIsMounted(true);
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch Orders when component mounts
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  // Fetch Orders from Sanity
  const fetchOrders = async () => {
    const ordersQuery = `*[_type == "order"]{
      _id,
      order_date,
      customer->{
        _id,
        name,
        email
      },
      items[] {
        productname,
        productprice,
        productdescription,
        quantity
      }
    }`;

    let ordersResponse = await client.fetch(ordersQuery);

    // Add manual descriptions and quantities for testing
    ordersResponse = ordersResponse.map((order: any) => ({
      ...order,
      items: order.items.map((item: any) => ({
        ...item,
        product_description:
          item.product_description || "This is a manually added description for testing.",
        quantity: item.quantity || Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
      })),
    }));

    console.log("Fetched Orders with Manual Data:", ordersResponse); // Debugging: Check the data
    setOrders(ordersResponse);
    setFilteredOrders(ordersResponse); // Show all orders initially
  };

  // Handle search input
  const handleSearch = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilters(searchTerm);

    // Filter orders by customer name or order ID
    const filtered = orders.filter((order) => {
      return (
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order._id.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredOrders(filtered);
  };

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setLoginError(""); // Reset error message on successful login
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  if (!isMounted) {
    return null; // Avoid rendering during hydration to prevent mismatch
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {!isLoggedIn ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
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
        <div className="p-6">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </header>

          {/* Search Section */}
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full md:w-1/3">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              value={filters}
              onChange={handleSearch}
              placeholder="Search by Order ID or Customer Name"
              className="w-full px-4 py-3 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Orders Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 cursor-pointer transition"
                >
                  <h4 className="text-lg font-medium text-gray-800">Order ID: {order._id}</h4>
                  <p className="text-gray-600">Customer: {order.customer.name}</p>
                  <p className="text-gray-600">Date: {new Date(order.order_date).toLocaleDateString()}</p>
                  <div className="mt-4">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="mb-3">
                        <h5 className="font-medium text-gray-800">{item.productname}</h5>
                        <p className="text-sm text-gray-600">
                          Description: {item.productdescription}
                        </p>
                        <p className="text-sm text-gray-600">Price: ${item.productprice}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
