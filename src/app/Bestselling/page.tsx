"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Bestsell({ product }: any) {
  const { isSignedIn } = useUser(); // Get the user's sign-in status
  const router = useRouter();

  const handleProductClick = () => {
    if (!isSignedIn) {
      // If not signed in, redirect to login page
      router.push("/login");
    } else {
      // If signed in, redirect to the product details page
      router.push(`/productdetails/${product.slug}`);
    }
  };

  // Validate product data before rendering
  if (!product || !product.slug || !product.image) {
    console.warn("Skipping product due to missing data:", product);
    return null; // Skip rendering if product is incomplete
  }

  return (
    <div className="product-section">
      <div className="product-list hover:scale-105 transition-transform duration-300 shadow-sm">
        <div onClick={handleProductClick}>
          <Image
            src={urlFor(product.image) || "/placeholder.jpg"} // Fallback to placeholder image
            alt={product.name || "Product"}
            width={400}
            height={400}
            className="product-image"
          />
          <div className="content">
            <h3 className="text-2xl font-semibold text-center">{product.name || "Unnamed Product"}</h3>
            <p className="text-gray-500 text-center">{product.slogan || "No slogan available"}</p>
            <div className="price-wrapper text-center">
              <span className="old-price">
                ${product.priceWithoutDiscount || "0.00"}
              </span>
              <span className="new-price">${product.price || "0.00"}</span>
            </div>
            <div className="color-options">
              <span className="color blue"></span>
              <span className="color green"></span>
              <span className="color orange"></span>
              <span className="color brown"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
