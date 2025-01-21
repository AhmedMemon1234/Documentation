"use client"; // Make sure it's marked as a client component
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  image: string;
  description: string;
  discountPercentage: number;
  rating: number;
  isNew: boolean;
  slogan?: string;
  slug: string;
  priceWithoutDiscount: number;
  price: number;
}

// Define Bestsell as a functional component that expects a product prop
export default function Bestsell({ product }: { product: Product }) {
  return (
    <div className="product-section">
      <div className="product-list hover:scale-105 transition-transform duration-300 shadow-sm">
        <Link href={`/productdetails/${product.slug}`}>
          <Image
            src={urlFor(product.image)} // Dynamically load image
            alt={product.name} // Dynamic alt text
            width={400}
            height={400}
            className="product-image"
          />
          <div className="content">
            <h3 className="text-2xl font-semibold text-center">{product.name}</h3>
            <p className="text-gray-500 text-center">{product.slogan}</p>
            <div className="price-wrapper text-center">
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
    </div>
  );
}
