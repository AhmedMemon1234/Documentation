import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaCartPlus, FaBandAid, FaHeart } from "react-icons/fa"; // Importing React Icons
import { GiClothes } from "react-icons/gi";

const DetailsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  // Fetch initial cart from localStorage
  useEffect(() => {
    const fetchCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    };

    fetchCart();

    // Listen to changes in localStorage
    const handleStorageChange = () => {
      fetchCart();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  // Toggle hamburger menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-200 w-full px-4 py-2 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo (Bandage Logo) - Left aligned */}
        <div className="flex items-center space-x-2">
          <GiClothes className="text-2xl text-gray-800" />
        </div>

        {/* Store Name - Centered */}
        <div className="flex flex-1 justify-start">
          <span className="font-bold text-xl text-gray-800">Bandage Store</span>
        </div>

        {/* Cart Icon with Badge - Right aligned */}
        <div className="relative">
          <Link href="/cartpage">
            <p>
              <FaCartPlus className="text-2xl text-gray-800" />
            
                <span className="absolute top-0 right-0 text-xs font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
            </p>
          </Link>
          <Link href={"/wishlist"}>
          <FaHeart className="text-2xl text-gray-800" />
          </Link>
        </div>

        {/* Hamburger Icon (for small devices) */}
        <div className="lg:hidden" onClick={toggleMenu}>
          <FaBars className="text-2xl text-gray-800" />
        </div>
      </div>

      {/* Navigation Links (Responsive) */}
      <nav className={`lg:flex space-x-6 ${isOpen ? "block" : "hidden"} lg:block`}>
        <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:-mt-9 justify-center w-full">
          <li>
            <Link href="/">
              <p className="text-gray-800 hover:text-blue-500">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/shop">
              <p className="text-gray-800 hover:text-blue-500">Shop</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="text-gray-800 hover:text-blue-500">About Us</p>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <p className="text-gray-800 hover:text-blue-500">Blog</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="text-gray-800 hover:text-blue-500">Contact</p>
            </Link>
          </li>
          <li>
            <Link href="/pricing">
              <p className="text-gray-800 hover:text-blue-500">Pricing</p>
            </Link>
          </li>
        </ul>
      </nav>
      
    </header>
  );
};

export default DetailsHeader;
