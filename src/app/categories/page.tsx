'use client'; 

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function Categories() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // Fetch data from Sanity
  const fetchData = async () => {
    const query = `*[_type == "product"] | order(_createdAt asc){
      name,
      description,
      price,
      priceWithoutDiscount,
      discountPercentage,
      image,
      rating,
      slogan,
      isNew,
      "slug":slug.current
    }`;
    const data = await client.fetch(query);
    setProducts(data);
    setFilteredProducts(data); // Initialize filteredProducts with all products
  };

  // Filter products based on the search term
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If search is empty, show all products
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Header/>
    <div className="product-section">
      <h1 className="text-center text-4xl font-semibold -mt-12 lg:text-6xl">Categories</h1>
      <div className="text-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products"
        className="mt-10 shadow-lg border-2 border-black p-3 w-full" // You can style this as needed
      />
      </div>
      <div className="flex-wrap flex justify-center gap-[12px] p-[20px]">
        {filteredProducts.map((product, index) => (
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
                <div className="color-options">
                  <span className="color blue"></span>
                  <span className="color green"></span>
                  <span className="color orange"></span>
                  <span className="color brown"></span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
        <button className="py-2 px-4 rounded bg-gray-200 text-gray-500">First</button>
        <button className="py-2 px-4 rounded bg-blue-500 text-gray-200">1</button>
        <button className="py-2 px-4 rounded hover:bg-gray-100 bg-gray-200">Soon...</button>
      </div>
    </div>
    </>
  );
}
