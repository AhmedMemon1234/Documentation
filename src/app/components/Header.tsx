"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiSupport } from "react-icons/bi"; // Icon for Customer Service
import { FaCog, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; // Icon for Admin Panel

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-[#232B42] text-white text-sm hidden md:block">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center flex-wrap">
          {/* Left Contact Info */}
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
          {/* Middle Promo */}
          <div className="text-center flex-grow hidden lg:block">
            Follow Us and get a chance to win 80% off
          </div>
          {/* Right Social Media */}
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
      <div className="bg-white shadow-sm border-b-0"> {/* Removed border */}
        <div className="container mx-auto py-4 flex items-center justify-between">
          {/* Left Logo */}
          <div className="text-2xl font-bold text-[#232B42]">
            <Link href="/">Bandage</Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:hidden lg:flex space-x-6 items-center text-gray-700 overflow-x-auto whitespace-nowrap">
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
            <Link href="/categories">Categories</Link>
            <Link href="/Meetteam">Blog</Link>
            <Link href="/Contact">Contact</Link>
            <Link href="/SimplePrice">Pages</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 text-[#1E90FF]">
            <Link href="/login" className="hidden md:block">
              Login / Register
            </Link>
            <button>
              <Link href={"/cartpage"}>
                <AiOutlineShoppingCart className="w-6 h-6" />
              </Link>
            </button>
            <button>
              <Link href={"/wishlist"}>
                <AiOutlineHeart className="w-6 h-6" />
              </Link>
            </button>
            <button>
              <Link href={"/profile"}>
                <CgProfile className="w-6 h-6" />
              </Link>
            </button>

            <button className="hidden sm:block">
              <Link href="/AdminPanel">
                <FaCog className="w-6 h-6"/>
              </Link>
            </button>

            <button className="hidden sm:block">
              <Link href="/CustomerService">
                <BiSupport className="w-6 h-6"/>
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
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col space-y-2 py-4 overflow-y-auto max-h-[60vh]">
            <Link href="/" className="px-4">Home</Link>
            <Link href="/ShopSection" className="px-4">Shop</Link>
            <Link href="/About" className="px-4">About</Link>
            <Link href="/categories" className="px-4">Categories</Link>
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
  );
};

export default Header;
