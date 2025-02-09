"use client";
import Hero from "./hero/page";
import Featured from "./Featured/page";
import Bestsell from "./Bestselling/page";
import Banner from "./downbanner/page";
import Banner2 from "./NeuralBanner/page";
import FeaturedPosts from "./Featuredpost/page";
import Header from "./components/Header";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  // Fetch product data from Sanity
  const fetchData = async () => {
    try {
      const query = `*[_type == "product"] | order(_createdAt asc){
        name,
        price,
        priceWithoutDiscount,
        discountPercentage,
        image,
        slogan,
        "slug":slug.current
      }`;
      const data = await client.fetch(query);

      if (data && Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <Featured />
      <div className="heading mt-20">
        <h2 className="text-center">Featured Products</h2>
        <h3 className="text-center">Bestseller Products</h3>
        <p className="text-center">Problems trying to resolve the conflict between</p>
      </div>
      <div className="flex-wrap flex justify-center">
        {products && products.length > 0 ? (
          products.slice(0, 8).map((product) => (
            <Bestsell key={product.slug || Math.random()} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <Banner />
      <Banner2 />
      <FeaturedPosts />
    </div>
  );
}
