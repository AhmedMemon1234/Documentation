"use client";

import React, { useState, useRef, useEffect } from "react";
import CheckoutBack from "../Checkout"; // Assuming this is the correct path
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
import { FaCreditCard, FaHome, FaUserCircle, FaPhoneAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import {loadStripe} from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY! || '')

const handleCheckout = async () => {
  const stripe = await stripePromise;
  if(!stripe){
    console.log('Failed To Load Stripe')
    return;
  }
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  if(cart.length === 0){
    console.log("cart is empty")
    return;
  }

  const response = await fetch("/api/session-checkout",{
   method : "POST",
   headers : {"Content-Type" : "application/json" },
   body: JSON.stringify({cart})
  })

  if(!response.ok){
    console.error("Error in Api Response", await response.text())
    return
  }

  const session = await response.json()
  await stripe.redirectToCheckout({sessionId :session.id})
}

const CombinedForm = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
   
  const getAd1 = useRef<HTMLInputElement>(null);
  const getCity = useRef<HTMLInputElement>(null);
  const getProvince = useRef<HTMLInputElement>(null);
  const getPostalCode = useRef<HTMLInputElement>(null);
  const getCountry = useRef<HTMLInputElement>(null);
  const getAddressResidentialIndicator = useRef<HTMLSelectElement>(null);

  const [shipmentDetails, setShipmentDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Processing"); // Dynamic order status
  const [cartItems, setCartItems] = useState<any[]>([]);

  const generateUUIDTrackingId = () => uuidv4();

  // Calculate total dynamically based on cart items
  const calculatetotal = () => {
    const productTotal = cartItems.reduce((acc, item) => {
      if (item.price && item.quantity) {
        return acc + item.price * item.quantity;
      }
      return acc; // Avoid NaN if price or quantity is missing
    }, 0);
    const shippingFee = 50; // Fixed shipping fee
    const tax = productTotal * 0.1; // 10% tax on product total
    return productTotal + shippingFee + tax;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };


  const fetchOrderStatus = async (trackingId: string) => {
    try {
      const res = await fetch(`/api/order-status?trackingId=${trackingId}`);
      const data = await res.json();
      if (data?.status) {
        setOrderStatus(data.status); // Update the order status dynamically
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  useEffect(() => {
    if (shipmentDetails?.trackingId) {
      // Poll for status updates every 10 seconds
      const interval = setInterval(() => {
        fetchOrderStatus(shipmentDetails.trackingId);
      }, 10000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }

    // Fetch cart data from localStorage and filter out invalid items
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]").filter((item: any) => item.price && item.quantity);
    setCartItems(cartData);
  }, [shipmentDetails?.trackingId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      customerInfo,
      shipToAddress: {
        addressLine1: getAd1.current?.value,
        cityLocality: getCity.current?.value,
        stateProvince: getProvince.current?.value,
        postalCode: getPostalCode.current?.value,
        countryCode: getCountry.current?.value,
        addressResidentialIndicator: getAddressResidentialIndicator.current?.value,
      },
      packages: [
        {
          weight: { value: 5, unit: "ounce" },
          dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
        },
      ],
    };

    try {
      toast.success("Redirecting You To Payment Page Please Wait...");

      await CheckoutBack([], customerInfo); // Custom backend logic for order placement

      const res = await fetch("/api/shipengine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setShipmentDetails(data);
      setOrderPlaced(true);

     
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-3xl mt-20 mx-auto p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-6xl font-semibold text-center text-blue-600 mb-6">Checkout</h2>
    
        {orderPlaced ? (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-600">Order Confirmation</h3>
            <div className="mt-4">
              <p><strong>Customer Name:</strong> {customerInfo.name}</p>
              <p><strong>Address:</strong> {`${getAd1.current?.value || ""}, ${getCity.current?.value || ""}, ${getProvince.current?.value || ""}, ${getPostalCode.current?.value || ""}, ${getCountry.current?.value || ""}`}</p>
              <p><strong>Tracking ID:</strong> {shipmentDetails?.trackingId || generateUUIDTrackingId()}</p>
              <p><strong>Order Status:</strong> {orderStatus}</p>
              <p><strong>Total Amount:</strong> ${calculatetotal().toFixed(2)}</p> {/* Displaying the correct total */}
              <p>Your order is being processed. You will receive updates shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number:</label>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>
    
            {/* Shipment Details */}
            <div className="mb-4">
              <label htmlFor="addressLine1" className="block text-gray-700 font-medium mb-2">
                <FaHome className="inline mr-2 text-gray-500" /> Address:
              </label>
              <input
                type="text"
                name="address"
                id="addressLine1"
                ref={getAd1}
                value={customerInfo.address}
                onChange={handleInputChange}
                placeholder="456 Oak Avenue"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="cityLocality" className="block text-gray-700 font-medium mb-2">
                <FaMapMarkedAlt className="inline mr-2 text-gray-500" /> City/Locality:
              </label>
              <input
                type="text"
                id="cityLocality"
                ref={getCity}
                placeholder="Los Angeles"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="stateProvince" className="block text-gray-700 font-medium mb-2">State/Province:</label>
              <input
                type="text"
                id="stateProvince"
                ref={getProvince}
                placeholder="CA"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                ref={getPostalCode}
                placeholder="90001"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="countryCode" className="block text-gray-700 font-medium mb-2">Country:</label>
              <input
                type="text"
                id="countryCode"
                ref={getCountry}
                placeholder="USA"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="addressResidentialIndicator" className="block text-gray-700 font-medium mb-2">Residential Indicator:</label>
              <select
                id="addressResidentialIndicator"
                ref={getAddressResidentialIndicator}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="true">Residential</option>
                <option value="false">Business</option>
              </select>
            </div>
    
            {/* Submit Button */}
            <div className="mt-4 text-center">
              <button
                type="submit"
                onClick={handleCheckout}
                className="w-full py-3 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Payment System
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default CombinedForm;
