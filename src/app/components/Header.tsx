"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BiSupport } from "react-icons/bi"; 
import { FaCog, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; 
import { UserButton, useUser } from "@clerk/clerk-react"; // Clerk user authentication
import SearchHeader from "../SearchComponent/page";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); // Use Clerk's useUser to get user info
  const [cart,setCart] = useState<any[]>([])
  const [categories, setCategories] = useState(false)

  const handleCategory = ()=>{
    setCategories(!categories)
  }

  useEffect(()=>{
    
  const fetchData = ()=>{
    const storedCart = localStorage.getItem("cart")
    if(storedCart){
      setCart(JSON.parse(storedCart))
    }
    else{
      setCart([])
    }
  }

  fetchData()

  const HandleupdateCart = ()=>{
    fetchData()
  }

  window.addEventListener("storage",HandleupdateCart)
  
  return()=>{
      window.removeEventListener("storage", HandleupdateCart)
  }

  },[])
  const handleProductClick = () => {
    if (!user) {
      // If the user is not signed in, redirect to login page
      window.location.href = "/login";
    }
  };

  return (
    <>
    <header>
      {/* Top Bar */}
      <div className="bg-[#232B42] text-white text-sm hidden md:block">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center flex-wrap">
          <div className="flex items-center space-x-4 whitespace-nowrap">
            <div className="flex items-center space-x-1">
              <span>📞</span>
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📧</span>
              <span>michelle.rivera@example.com</span>
            </div>
          </div>
          <div className="text-center flex-grow hidden lg:block">
            Follow Us and get a chance to win 80% off
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4 whitespace-nowrap">
            <span>Follow Us:</span>
            <div className="flex space-x-2">
              <Link href="/">
                <FaInstagram className="w-4 h-4 text-white hover:text-blue-300" />
              </Link>
              <Link href="/">
                <FaYoutube className="w-4 h-4 text-white hover:text-blue-300" />
              </Link>
              <Link href="/">
                <FaFacebook className="w-4 h-4 text-white hover:text-blue-300" />
              </Link>
              <Link href="/">
                <FaTwitter className="w-4 h-4 text-white hover:text-blue-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-sm border-b-0">
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#232B42]">
            <Link href="/">Bandage</Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-4 items-center text-gray-700 overflow-x-auto whitespace-nowrap">
            <Link href="/">Home</Link>
            <div className="relative group">
              <Link href={"/ShopSection"}>
                <button className="flex items-center">
                  Shop
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <Link href="/About">About</Link>
            <div onClick={handleCategory} className="cursor-pointer">Categories</div>
            <Link href="/Meetteam">Blog</Link>
            <Link href="/Contact">Contact</Link>
            <Link href="/SimplePrice">Pages</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
          {
  categories && (
    <div className="w-full sm:w-[35%] bg-gray-50 absolute mt-[365px] z-50 left-1/2 transform -translate-x-1/2 p-2 rounded-lg shadow-lg">
      {/* Men's Category */}
      <Link href={"/ClothCategory"}>
      <div className="w-full p-2 text-center mb-2">
        <h1 className="text-lg font-semibold text-gray-700">Cloth's Collection</h1>
        <p className="text-xs text-gray-500 mt-1">Cheap and best looking outfits.</p>
      </div>
      </Link>
      <Link href={"/ElectronicCategory"}>
      <div className="w-full p-2 text-center mb-2">
        <h1 className="text-lg font-semibold text-gray-700">Electronic's Category</h1>
        <p className="text-xs text-gray-500 mt-1">Trendy and elegant fashion of Electronic.</p>
      </div>
      </Link>
      {/* Kids' Category */}
      <Link href={"/WorkInProgress"}>
      <div className="w-full p-2 text-center mb-2">
        <h1 className="text-lg font-semibold text-gray-700">Gadget's Collection</h1>
        <p className="text-xs text-gray-500 mt-1">Comfortable and stylish Gadget's.</p>
      </div>

      {/* Electronics Category */}
      <div className="w-full p-2 text-center mb-2">
        <h1 className="text-lg font-semibold text-gray-700">Watches Collection</h1>
        <p className="text-xs text-gray-500 mt-1">Top-quality Watches for you.</p>
      </div>
      </Link>
    </div>
  )
}


          {/* Right Icons */}
          <div className="flex items-center space-x-4 text-[#1E90FF]">
            {/* Login / Register Link */}
            {!user && (
              <Link href="/login" className="hidden md:block">
                Login / Register
              </Link>
            )}
            {user && (
              <UserButton />
            )}
            <button onClick={handleProductClick}>
              <Link href={"/cartpage"}>
                <AiOutlineShoppingCart className="w-6 h-6" />
                <h1 className="absolute -mt-10 ml-6">{cart.length}</h1>
              </Link>
            </button>
            <button onClick={handleProductClick}>
              <Link href={"/wishlist"}>
                <AiOutlineHeart className="w-6 h-6" />
              </Link>
            </button>

            {/* Admin Panel & Customer Service Icons */}
            <button className="hidden sm:block">
              <Link href="/AdminPanel">
                <FaCog className="w-6 h-6" />
              </Link>
            </button>

            <button className="hidden sm:block">
              <Link href="/CustomerService">
                <BiSupport className="w-6 h-6" />
              </Link>
            </button>

            <button
              className="md:flex lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

    {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden bg-white border-t z-50 relative">
    <nav className="flex flex-col space-y-2 py-4 overflow-y-auto max-h-[60vh] z-50">
      <Link href="/" className="px-4">Home</Link>
      <Link href="/ShopSection" className="px-4">Shop</Link>
      <Link href="/About" className="px-4">About</Link>
      <div onClick={handleCategory} className="cursor-pointer px-4">Categories</div>
      <Link href="/Meetteam" className="px-4">Blog</Link>
      <Link href="/Contact" className="px-4">Contact</Link>
      <Link href="/SimplePrice" className="px-4">Pages</Link>
      <Link href="/dashboard" className="px-4">Dashboard</Link>

      {/* Mobile Icons for Admin Panel and Customer Service */}
      <div className="flex space-x-4 px-4 mt-4">
        <Link href="/AdminPanel">
          <FaCog className="w-6 h-6" />
        </Link>
        <Link href="/CustomerService">
          <BiSupport className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  </div>
)}
    </header>
    <SearchHeader/>
  </>
  );
};

export default Header;
