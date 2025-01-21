"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DetailsHeader from "../DetailsHeader";
import { toast, ToastContainer } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        setWishlist(parsedWishlist);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    }
  }, []);

  const handleRemove = (index: number) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    toast.success("Product Removed Successfully");
  };

  return (
    <>
      <DetailsHeader />
      <ToastContainer />
      <div className="font-sans max-w-7xl mx-auto bg-white py-20 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Your Wishlist
        </h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:flex-row gap-6 p-6 bg-white border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="w-full sm:w-1/3 lg:w-40 h-40 max-w-[200px] mx-auto">
                  <Image
                    src={urlFor(item.image)}
                    alt={item.name}
                    width={200} // Setting a fixed width
                    height={200} // Fixed height to maintain aspect ratio
                    className="w-full h-full object-contain rounded-lg" // Ensuring the image is contained within the box
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between w-full text-center sm:text-left">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-lg text-gray-600 font-medium">
                      Price: ${item.price}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <div className="mt-4 flex justify-center sm:justify-start">
                    <button
                      onClick={() => handleRemove(index)}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your wishlist is empty!
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Add some items to your wishlist to get started.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
