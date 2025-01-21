"use client";

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import DetailsHeader from "@/app/DetailsHeader";
import { BiHeart, BiHeartCircle } from "react-icons/bi"; // BiHeartCircle for filled heart icon
import { BiShareAlt } from 'react-icons/bi'; // Share Icon

const ProductDetails = ({ params: { slug } }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);
    // Load reviews from localStorage on component mount
    useEffect(() => {
      const storedReviews = localStorage.getItem('reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }, []);
  
    // Save reviews to localStorage whenever reviews change
    useEffect(() => {
      if (reviews.length > 0) {
        localStorage.setItem('reviews', JSON.stringify(reviews));
      }
    }, [reviews]);
  
    const handleRatingChange = (value: number) => {
      setRating(value);
    };
  
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment(event.target.value);
    };
  
    const handleSubmit = () => {
      if (rating && comment.trim()) {
        const newReview = { rating, comment };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        setRating(0);
        setComment('');
      } else {
        alert('Please provide a rating and a comment!');
      }
  
    }
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color", {
        className: "bg-red-500 text-white font-medium",
      });
      return;
    }

    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];

    const updatedCart = [
      ...parsedCart,
      {
        ...product,
        selectedSize,
        selectedColor,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Product added to cart", {
      className: "bg-green-500 text-white font-medium",
    });
  };

  const sizes = ["SM", "MD", "LG", "XL"];
  const colors = ["RED", "YELLOW", "PURPLE", "ORANGE"];

  // Add to wishlist handler
  const handleAddToWishlist = () => {
    const storedWishlist = localStorage.getItem("wishlist");
    const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    // Check if the product is already in the wishlist
    if (parsedWishlist.some((item: any) => item.slug === product.slug)) {
      toast.success("Product is already in your wishlist", {});
      return;
    }

    const updatedWishlist = [...parsedWishlist, { ...product }];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(true);
    toast.success("Product added to wishlist", {
      className: "bg-green-500 text-white font-medium",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.slogan,
        url: window.location.href, // Current page URL
      })
        .then(() => {
          toast.success("Product shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing the product: ", error); // Debug the error
          toast.error("Error sharing the product.");
        });
    } else {
      // Fallback: Show a custom message or link
      toast.error("Sharing is not supported on your device.");
    }
  };

  useEffect(() => {
    // Check if the product is already in wishlist
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      setIsInWishlist(parsedWishlist.some((item: any) => item.slug === slug));
    }

    const fetchData = async () => {
      // Fetch current product details
      const productQuery = groq`
        *[_type == "product" && slug.current == $slug][0]{
          name,
          slogan,
          description,
          price,
          priceWithoutDiscount,
          discountPercentage,
          image,
          additionalImages,
          rating,
          sizes,
          colors,
          "slug": slug.current
        }`;
      const productData = await client.fetch(productQuery, { slug });
      setProduct(productData);

      // Fetch related products
      const relatedProductsQuery = groq`
        *[_type == "product" && slug.current != $slug][0..5]{
          name,
          price,
          priceWithoutDiscount,
          image,
          "slug": slug.current
        }`;
      const relatedData = await client.fetch(relatedProductsQuery, { slug });
      setRelatedProducts(relatedData);
    };
    fetchData();
  }, [slug]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <DetailsHeader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <div className="font-sans mt-[60px]">
        <h1 className="pt-[15px] p-4 font-medium text-lg z-50">
          Home / Product / {product.name}
        </h1>
        <div className="grid items-start grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2 grid grid-cols-2 lg:sticky top-0 gap-0.5">
            <div className="columns-2 gap-0.5 space-y-0.5">
              {[product.image, product.image, product.image, product.image].map(
                (img, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <Image
                      src={urlFor(img)}
                      alt={`Product ${idx}`}
                      width={500}
                      height={300}
                      className="w-full aspect-[253/337] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
                    />
                  </div>
                )
              )}
            </div>
            <div className="overflow-hidden">
              <Image
                src={urlFor(product.image)}
                alt="Product"
                width={500}
                height={300}
                className="w-full aspect-[3/4] object-cover object-top shadow-md hover:scale-[1.05] transition-all duration-300"
              />
            </div>
          </div>

          <div className="py-6 px-8 max-lg:max-w-2xl">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Adjective Attire | {product.name}
              </h2>
              <p className="text-sm text-gray-500 mt-2">{product.slogan}</p>
            </div>

            {/* Product Rating */}
            <div className="flex items-center space-x-1 mt-2">
              {Array.from({ length: Math.floor(product.rating) }).map(
                (_, index) => (
                  <svg
                    key={`star-filled-${index}`}
                    className="w-4 h-4 fill-blue-600"
                    viewBox="0 0 14 13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                )
              )}
              <p className="text-sm text-gray-800 !ml-3">
                {product.rating.toFixed(1)} (150)
              </p>
            </div>

            {/* Share Button */}
            <div className="mt-6 text-4xl">
              <button onClick={handleShare} className="text-blue-600 hover:text-blue-800">
                <BiShareAlt className="w-8 h-8" />
              </button>
            </div>

            {/* Size Options */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Sizes</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                {sizes.map((size, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-9 border ${
                      selectedSize === size ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
                    } text-sm flex items-center justify-center rounded-md`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Colors</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-9 rounded-md ${
                      selectedColor === color
                        ? "border-2 border-black"
                        : "border border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                    }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Wishlist Button */}
            <div className="mt-6 text-4xl">
              <button onClick={handleAddToWishlist}>
                {isInWishlist ? (
                  <BiHeartCircle className="text-red-600" />
                ) : (
                  <BiHeart className="text-gray-500" />
                )}
              </button>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>

            {/* Check Your Cart and Description Section */}
            <div className="mt-6">
              <Link href="/cartpage" className="text-blue-600 hover:text-blue-800">
                <button className="w-full text-sm text-center font-semibold py-2 rounded-md border border-gray-400">
                  Check Your Cart
                </button>
              </Link>
              <h1 className="mt-5 text-3xl text-center font-semibold">Product Description</h1>
              <p className="text-sm text-gray-600 mt-4">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <h1 className="text-center text-4xl font-semibold mt-12">Related Products</h1>
        <div className="flex-wrap flex justify-center gap-[12px] p-[20px]">
          {relatedProducts.map((product, index) => (
            <div className="card" key={index}>
              <Link href={`/productdetails/${product.slug}`}>
                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="product-image"
                />
                <div className="content">
                  <h3 className="text-2xl font-semibold text-center">{product.name}</h3>
                  <p className="text-gray-500 text-center">{product.slogan}</p>
                  <div className="price-wrapper">
                    <span className="old-price">${product.priceWithoutDiscount}</span>
                    <span className="new-price">${product.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-10 space-y-6 p-4 border rounded-md shadow-lg max-w-lg mx-auto">
      <h3 className="text-xl font-semibold">Rate this product</h3>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-3xl cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write your comment"
        className="mt-2 px-4 py-2 border rounded-md w-full max-w-xs"
      />
      <button
        onClick={handleSubmit}
        className="mt-3 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Submit
      </button>

      <div className="mt-6 w-full space-y-4">
        <h4 className="text-lg font-semibold">Reviews</h4>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="flex items-center space-x-2 p-4 border rounded-md">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${review.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
      </div>
    </>
  );
};

export default ProductDetails;
