"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCircle } from "react-icons/fa";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("cart");
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <FaCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Thank You for Your Purchase!</h2>
        <p className="text-gray-600 mt-2">Your order has been successfully placed.</p>
        <p className="text-gray-500 text-sm mt-1">You will be redirected to the homepage shortly.</p>
      </div>
    </div>
  );
}
