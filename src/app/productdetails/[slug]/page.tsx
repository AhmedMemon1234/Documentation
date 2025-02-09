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
import { BiHeart, BiHeartCircle, BiShareAlt } from "react-icons/bi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";

const ProductDetails = ({ params: { slug } }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGraphicCard, setSelectedGraphicCard] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [openSection, setOpenSection] = useState<string | null>(null); // Track which section is open
  const [showAddToCartAnimation, setShowAddToCartAnimation] = useState(false); // For the custom animation
  const router = useRouter();

  // Load reviews from localStorage
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  }, [reviews]);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = () => {
    if (rating && comment.trim()) {
      const newReview = { rating, comment };
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!", {
        className: "bg-green-500 text-white font-medium",
      });
    } else {
      toast.error("Please provide a rating and a comment!", {
        className: "bg-red-500 text-white font-medium",
      });
    }
  };
  const handleAddToCart = () => {
    // Check if no section is selected
    if (!openSection) {
      toast.error("Please select a category (Clothes, PCs, or Mobiles)", {
        className: "bg-red-500 text-white font-medium",
      });
      return;
    }
  
    // Validate selected options based on the open section
    if (
      (openSection === "clothes" && (!selectedSize || !selectedColor)) ||
      (openSection === "pcs" && (!selectedSpec || !selectedGraphicCard)) ||
      (openSection === "mobiles" && (!selectedSpec || !selectedColor))
    ) {
      toast.error("Please select all required options", {
        className: "bg-red-500 text-white font-medium",
      });
      return;
    }
  
    setIsAddingToCart(true);
    setShowAddToCartAnimation(true); // Show the custom animation
  
    setTimeout(() => {
      const storedCart = localStorage.getItem("cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
  
      // Add the product with selected options to the cart
      const updatedCart = [
        ...parsedCart,
        {
          ...product,
          type: openSection, // Add the product type (e.g., "clothes", "pcs", "mobiles")
          selectedSpec, // For PCs and Mobiles
          selectedSize, // For Clothes
          selectedColor, // For Clothes and Mobiles
          selectedGraphicCard, // For PCs
        },
      ];
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsAddingToCart(false);
      setShowAddToCartAnimation(false); // Hide the animation
      router.push("/cartpage"); // Redirect to cart page
    }, 3000); // Simulate a 3-second animation
  };

  const handleAddToWishlist = () => {
    const storedWishlist = localStorage.getItem("wishlist");
    const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

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
        url: window.location.href,
      })
        .then(() => {
          toast.success("Product shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing the product: ", error);
          toast.error("Error sharing the product.");
        });
    } else {
      toast.error("Sharing is not supported on your device.");
    }
  };

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      setIsInWishlist(parsedWishlist.some((item: any) => item.slug === slug));
    }

    const fetchData = async () => {
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
          "slug": slug.current
        }`;
      const productData = await client.fetch(productQuery, { slug });
      setProduct(productData);
      setActiveImage(urlFor(productData.image));

      const relatedProductsQuery = groq`
        *[_type == "product" && slug.current != $slug][0..7]{
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

  // Animation Variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const scaleUp: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  // Slider Settings for Related Products
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Toggle collapsible sections
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <motion.div
            className="relative overflow-hidden rounded-lg shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={activeImage}
              alt={product.name}
              width={800}
              height={800}
              className="w-full aspect-square object-cover object-center"
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {(product.additionalImages || []).map((image: any, index: number) => (
                <div
                  key={index}
                  className="cursor-pointer border-2 rounded-lg overflow-hidden"
                  onClick={() => setActiveImage(urlFor(image))}
                >
                  <Image
                    src={urlFor(image)}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="py-6 px-8 bg-white rounded-lg shadow-lg"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{product.slogan}</p>

            {/* Price and Discount */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.priceWithoutDiscount}
                  </span>
                  <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-6">
              {Array.from({ length: Math.floor(product.rating) }).map(
                (_, index) => (
                  <svg
                    key={`star-filled-${index}`}
                    className="w-5 h-5 fill-yellow-500"
                    viewBox="0 0 14 13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                )
              )}
              <p className="text-sm text-gray-800 !ml-3">
                {product.rating.toFixed(1)} (150 Reviews)
              </p>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-4 mb-6">
              {/* Clothes Section */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection("clothes")}
                  className="w-full p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                >
                  <span className="text-lg font-bold text-gray-800">Clothes</span>
                  <span className="text-gray-600">
                    {openSection === "clothes" ? "▲" : "▼"}
                  </span>
                </button>
                {openSection === "clothes" && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">
                          Size
                        </label>
                        <select
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                        >
                          <option value="">Select Size</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">
                          Color
                        </label>
                        <select
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                        >
                          <option value="">Select Color</option>
                          <option value="Red">Red</option>
                          <option value="Blue">Blue</option>
                          <option value="Green">Green</option>
                          <option value="Black">Black</option>
                          <option value="White">White</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PCs Section */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection("pcs")}
                  className="w-full p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                >
                  <span className="text-lg font-bold text-gray-800">PCs</span>
                  <span className="text-gray-600">
                    {openSection === "pcs" ? "▲" : "▼"}
                  </span>
                </button>
                {openSection === "pcs" && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">
                          RAM
                        </label>
                        <select
                          onChange={(e) => setSelectedSpec(e.target.value)}
                          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                        >
                          <option value="">Choose RAM</option>
                          <option value="8GB">8GB</option>
                          <option value="16GB">16GB</option>
                          <option value="32GB">32GB</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">
                          Graphic Card
                        </label>
                        <select
                          onChange={(e) => setSelectedGraphicCard(e.target.value)}
                          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                        >
                          <option value="">Choose Graphic Card</option>
                          <option value="NVIDIA GTX 1650">NVIDIA GTX 1650</option>
                          <option value="NVIDIA RTX 3060">NVIDIA RTX 3060</option>
                          <option value="AMD Radeon RX 6700 XT">AMD Radeon RX 6700 XT</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobiles Section */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection("mobiles")}
                  className="w-full p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                >
                  <span className="text-lg font-bold text-gray-800">Mobiles</span>
                  <span className="text-gray-600">
                    {openSection === "mobiles" ? "▲" : "▼"}
                  </span>
                </button>
                {openSection === "mobiles" && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">
                          Storage
                        </label>
                        <select
                          onChange={(e) => setSelectedSpec(e.target.value)}
                          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                        >
                          <option value="">Choose storage</option>
                          <option value="64GB">64GB</option>
                          <option value="128GB">128GB</option>
                          <option value="256GB">256GB</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2">
                          Color
                        </label>
                        <select
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                        >
                          <option value="">Select Color</option>
                          <option value="Red">Red</option>
                          <option value="Blue">Blue</option>
                          <option value="Green">Green</option>
                          <option value="Black">Black</option>
                          <option value="White">White</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Button with Animation */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              disabled={
                !openSection || // Disable if no section is selected
                (openSection === "clothes" && (!selectedSize || !selectedColor)) ||
                (openSection === "pcs" && (!selectedSpec || !selectedGraphicCard)) ||
                (openSection === "mobiles" && (!selectedSpec || !selectedColor))
              }
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 relative overflow-hidden disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <AnimatePresence>
                {isAddingToCart && (
                  <motion.span
                    className="absolute inset-0 bg-blue-700"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 1 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </span>
            </motion.button>

            {/* Wishlist and Share Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleAddToWishlist}
                className="flex items-center text-gray-600 hover:text-red-600 transition-all duration-300"
              >
                {isInWishlist ? (
                  <BiHeartCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <BiHeart className="w-6 h-6" />
                )}
                <span className="ml-2">Wishlist</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300"
              >
                <BiShareAlt className="w-6 h-6" />
                <span className="ml-2">Share</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Product Description */}
        <motion.div
          className="mt-12 p-8 bg-white rounded-lg shadow-lg"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Product Description
          </h3>
          <p className="text-gray-600">{product.description}</p>
        </motion.div>

        {/* Rating and Review Component */}
        <motion.div
          className="mt-12 p-8 bg-white rounded-lg shadow-lg"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Rate this Product
          </h3>
          <div className="flex space-x-1 mb-4">
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
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your review..."
            className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            onClick={handleSubmitReview}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Submit Review
          </button>

          {/* Display Reviews */}
          <div className="mt-6 space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-md">
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
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        <h1 className="text-center text-4xl font-semibold mt-12">
          Related Products
        </h1>
        <div className="mt-8 p-8">
          <Slider {...sliderSettings}>
            {relatedProducts.map((product, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden mx-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/productdetails/${product.slug}`}>
                  <Image
                    src={urlFor(product.image)}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-500">{product.slogan}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-gray-500 line-through">
                        ${product.priceWithoutDiscount}
                      </span>
                      <span className="text-blue-600 font-bold">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Add to Cart Animation Modal */}
      <AnimatePresence>
        {showAddToCartAnimation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Managing Your Product...</h2>
              <motion.div
                className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              <p className="text-gray-600">Your product is being managed. Please wait...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetails;