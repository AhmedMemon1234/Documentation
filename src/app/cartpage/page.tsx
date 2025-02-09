"use client";

import { useRouter } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DetailsHeader from "../DetailsHeader";

const CartItem = () => {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const shippingFee = 50; // Fixed shipping fee

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);

        // Ensure all items have valid quantity and price
        const validatedCart = parsedCart.map((item: any) => ({
          ...item,
          quantity: item.quantity && !isNaN(item.quantity) ? item.quantity : 1,
          price: item.price && !isNaN(parseFloat(item.price)) ? parseFloat(item.price) : 0,
        }));

        setCart(validatedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  const handleIncrease = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const handleDecrease = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const handleRemove = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((acc, product) => {
    const price = product.price ? parseFloat(product.price) : 0;
    const quantity = product.quantity ? parseInt(product.quantity) : 0;
    return acc + price * quantity;
  }, 0);

  const handleCheckout = () => {
    router.push(`/CheckoutForm`);
  };

  const handleContinue = () => {
    router.push(`/Downproduct`);
  };

  // Function to render product details based on type
  const renderProductDetails = (product: any) => {
    switch (product.type) {
      case "clothes":
        return (
          <>
            <h6 className="text-sm text-gray-800">Size: <strong className="ml-2">{product.selectedSize}</strong></h6>
            <h6 className="text-sm text-gray-800">Color: <strong className="ml-2">{product.selectedColor}</strong></h6>
          </>
        );
      case "pcs":
        return (
          <>
            <h6 className="text-sm text-gray-800">RAM: <strong className="ml-2">{product.selectedSpec}</strong></h6>
            <h6 className="text-sm text-gray-800">Graphics Card: <strong className="ml-2">{product.selectedGraphicCard}</strong></h6>
          </>
        );
      case "mobiles":
        return (
          <>
            <h6 className="text-sm text-gray-800">Storage: <strong className="ml-2">{product.selectedSpec}</strong></h6>
            <h6 className="text-sm text-gray-800">Color: <strong className="ml-2">{product.selectedColor}</strong></h6>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DetailsHeader />
      <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-20">
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-10">Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-10 p-4 mt-16">
            <div className="lg:col-span-2 bg-white divide-y">
              {cart.map((product, index) => (
                <div key={index} className="flex items-start max-sm:flex-col gap-4 py-4">
                  <div className="w-32 h-full shrink-0">
                    <Image
                      src={urlFor(product.image)}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full aspect-[112/149] object-contain"
                    />
                  </div>

                  <div className="flex items-start gap-4 w-full">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 mb-1">{product.name}</h3>
                      <div className="space-y-1">
                        {renderProductDetails(product)}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4">
                        <button
                          onClick={() => handleRemove(index)}
                          className="font-semibold text-red-500 text-sm flex items-center gap-2 shrink-0"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                            <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="ml-auto text-right">
                      <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2 w-max">
                        <button
                          onClick={() => handleDecrease(index)}
                          className="border-none outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 121.805 121.804">
                            <path d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z" />
                          </svg>
                        </button>
                        <span className="text-gray-800 text-sm font-semibold px-3">{product.quantity}</span>
                        <button
                          onClick={() => handleIncrease(index)}
                          className="border-none outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" viewBox="0 0 512 512">
                            <path d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z" />
                            <path d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-base font-bold text-gray-500 mb-1"><h2 className="font-medium line-through">${(product.priceWithoutDiscount).toFixed(2)}</h2></h4>
                        <h4 className="text-base font-bold text-gray-800">${(product.price * product.quantity).toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border rounded-lg bg-gray-50 space-y-4 flex flex-col justify-between h-[400px]">
              <div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Subtotal:</p>
                  <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Shipping Fee:</p>
                  <p className="text-lg font-semibold">${shippingFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Tax (10%):</p>
                  <p className="text-lg font-semibold">${(subtotal * 0.1).toFixed(2)}</p>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <p className="text-lg font-bold">Total:</p>
                  <p className="text-lg font-bold">${(subtotal + shippingFee + subtotal * 0.1).toFixed(2)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 italic">
                  Estimated delivery: 3-5 business days
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold py-2 px-4 rounded-lg"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-lg"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-12">
            <h2 className="text-3xl font-bold text-gray-800">Your cart is empty!</h2>
            <p className="mt-4 text-lg text-gray-500">Add some items to your cart to get started.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartItem;