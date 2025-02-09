"use client";

import { client } from "@/sanity/lib/client";
import { Customer } from "../app/customer";
import { Types } from "../app/Type";

// Create Customer in Sanity
const CreateCustomerInSanity = async (customerInfo: Customer) => {
  try {
    const customerObject = {
      _type: "customer",
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
    };
    const response = await client.create(customerObject);
    return response;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error; // Re-throw the error to handle it in the main function
  }
};

// Create Order in Sanity
const CreateOrderInSanity = async (cartData: Types[], customer_id: string) => {
  try {
    const orderObject = {
      _type: "order",
      customer: {
        _type: "reference",
        _ref: customer_id,
      },
      items: cartData.map((item: Types) => ({
        _type: "items",
        _id: item._id,
        productname: item.name,
        productprice: item.price,
        productdescription: item.description,
        quantity: item.quantity,
        selectedSize: item.selectedSize, // Add selected size
        selectedColor: item.selectedColor, // Add selected color
        selectedSpec: item.selectedSpec, // Add selected spec (RAM/Storage)
        selectedGraphicCard: item.selectedGraphicCard, // Add selected graphic card
      })),
      order_date: new Date().toISOString(),
    };
    const response = await client.create(orderObject);
    console.log("Order created in Sanity:", response);
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Re-throw the error to handle it in the main function
  }
};

// Main Checkout Function
export default async function CheckoutBack(cartData: Types[], customerInformation: Customer) {
  try {
    // Retrieve cart data from LocalStorage (if needed)
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) {
      throw new Error("Cart is empty or not found");
    }

    const parsedCart = JSON.parse(storedCart);

    // Create the customer in Sanity
    const customer = await CreateCustomerInSanity(customerInformation);
    if (!customer) {
      throw new Error("Customer creation failed");
    }

    // Create order in Sanity with cart data and customer reference
    await CreateOrderInSanity(parsedCart, customer._id);

    console.log("Order placed successfully");

    // Clear the cart after successful order placement
    localStorage.removeItem("cart");

    return { success: true, message: "Order placed successfully!" };
  } catch (error) {
    console.error("Error placing order:", error);
    return { success: false, message: "Failed to place order. Please try again." };
  }
}