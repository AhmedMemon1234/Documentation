"use client";
import Aboutpage from "../Aboutpage/page";
import Aboutparagraph from "../Aboutparagraph/page";
import Rating from "../Rating/page";
import Aboutbigban from "../Aboutbigban/page";
import Ourteam from "../Ourteam/page";
import TeamCards from "../Ourteamcard/page";
import Bigcompany from "../Bigcompanieshead/page";
import LogoRow from "../brandbanner/page";
import Aboutbig from "../Aboutbig/page";
import { useState } from "react";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between w-full">
          <a href="/">
            <h1 className="text-xl font-bold">Bandage</h1>
          </a>

          {/* Hamburger Menu */}
          <button
            id="toggleOpen"
            className="lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {/* Navigation Menu */}
          <nav
            id="collapseMenu"
            className={`lg:block ${
              isMenuOpen ? "block" : "hidden"
            } max-lg:fixed max-lg:bg-white max-lg:w-3/4 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-lg max-lg:overflow-y-auto z-50`}
          >
            <button
              id="toggleClose"
              className="lg:hidden absolute top-4 right-4 z-50 bg-gray-200 p-2 rounded-full shadow-md"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
              </svg>
            </button>

            <ul className="lg:flex gap-6 max-lg:space-y-4">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-600 text-blue-700 block font-semibold"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/Meetteam"
                  className="hover:text-blue-600 text-gray-700 block font-semibold"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="/SimplePrice"
                  className="hover:text-blue-600 text-gray-700 block font-semibold"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/Contact"
                  className="hover:text-blue-600 text-gray-700 block font-semibold"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:flex space-x-4">
            <button className="px-4 py-2 text-sm font-bold text-blue-800">
              Login
            </button>
            <button className="px-4 py-2 text-sm rounded-full font-bold text-white bg-blue-600 hover:bg-transparent hover:text-blue-600 border border-blue-600 transition-all duration-300">
              Become A Member
            </button>
          </div>
        </div>
      </header>
      <Aboutpage />
      <Aboutparagraph />
      <Rating />
      <Aboutbigban />
      <Ourteam />
      <TeamCards />
      <Bigcompany />
      <LogoRow />
      <Aboutbig />
    </>
  );
}
