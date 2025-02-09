"use client";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

export default function Bestproduct() {
  const [products, setProducts] = useState<any[]>([]);
  const { isSignedIn } = useUser(); // Get the user's sign-in status
  const router = useRouter();

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
    }[8..21]`;
    const data = await client.fetch(query);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
 useEffect(()=>{
  if(isSignedIn){
    const Storedslug = localStorage.getItem("pendingslug")
    if(Storedslug){
      localStorage.removeItem("pendingslug")
      router.push(`/productdetails/${Storedslug}`)
    }
  }
 },[isSignedIn])
  const handleProductClick = (slug: string) => {
    if (!isSignedIn) {
      // If not signed in, redirect to login page
      localStorage.setItem("pendingslug",slug)
      router.push("/login");
    } else {
      // If signed in, redirect to the product details page
      router.push(`/productdetails/${slug}`);
    }
  };

  return (
    <div className="product-section">
      <div className="flex-wrap flex justify-center gap-[12px] p-[20px]">
        {products.map((product, index) => (
          <div className="card" key={index} onClick={() => handleProductClick(product.slug)}>
            <Image
              src={urlFor(product.image)} // Dynamically load image
              alt={product.name} // Dynamic alt text
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
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
        <button className="py-2 px-4 rounded bg-gray-200 text-gray-500">First</button>
        <button className="py-2 px-4 rounded hover:bg-gray-100 text-gray-500">1</button>
        <button className="py-2 px-4 rounded bg-blue-500 text-white">2</button>
        <button className="py-2 px-4 rounded hover:bg-gray-100 text-gray-500">3</button>
        <button className="py-2 px-4 rounded bg-gray-200 text-gray-500">Next</button>
      </div>
    </div>
  );
}
