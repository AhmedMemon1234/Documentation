"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchHeader = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product"] | order(_createdAt asc){
        name,
        "slug":slug.current,
        image
      }`;
      const data = await client.fetch(query);
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <header className="absolute top-6 left-3 max-w-lg z-50"> {/* Left Side with Some Margin */}
      <motion.div 
        initial={{ width: "200px" }} 
        animate={{ width: isFocused ? "250px" : "200px" }}
        transition={{ duration: 0.3 }}
        className="relative flex bg-white shadow-lg rounded-full border border-black p-2 px-4 mt-20"
      >
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products"
          className="outline-none w-full bg-transparent"
        />
      </motion.div>
      
      {searchTerm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bg-white shadow-md border w-full max-h-[300px] overflow-y-auto rounded-md mt-2"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link href={`/productdetails/${product.slug}`} key={product.slug}>
                <div className="flex items-center p-4 border-b hover:bg-gray-100">
                  <Image
                    src={urlFor(product.image)}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No products found</div>
          )}
        </motion.div>
      )}
    </header>
  );
};

export default SearchHeader;
