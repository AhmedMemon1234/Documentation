import { LuPhone } from "react-icons/lu";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BiDownArrowAlt } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { BiMenuAltRight } from "react-icons/bi";
export default function Header(){
    return(
        <div className="Parentheader">
        <div className="Childheader">
            <LuPhone className="Phoneicon"/>
            <h1 className="Phonenumber">(225)-555-0118</h1>
<IoMailOpenOutline className="Mailicon"/>
<h1 className="Mail">michelle.rivera@example.com</h1>
<h1 className="Follow">Follow Us and get a chance to win 80% off</h1>
<h1 className="Followus">Follow Us : </h1>
<div className="Icons"><FaInstagram/><FaYoutube/><FaFacebook/><FaTwitter/></div>
        </div>
        <div className="Mainheader">
        <input type="checkbox" id="check"/>
            <label htmlFor="check" className="checkbtn">
            <BiMenuAltRight className="hamburger"/>
            </label>
            <h1 className="Bandage">Bandage</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li className="Shop"><a href="/ShopSection">Shop <BiDownArrowAlt className="Arrowicon"/></a></li>
                <li><a href="/About">About</a></li>
                <li><a href="/Team">Blog</a></li>
                <li><a href="/Contact">Contact</a></li>
                <li><a href="/SimplePrice">Pages</a></li>
            </ul>
            <h1 className="Login"><VscAccount className="Signicon"/> Login / Register</h1>
            <div className="Icons2"><CiSearch/></div>
            <a href="/cart"><FiShoppingCart className="Carticon"/><h1 className="num1">1</h1></a>
            <CiHeart className="Wishlisticon"/><h1 className="num2">2</h1> 
        </div>
        </div>
    )
}