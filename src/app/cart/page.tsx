import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import ProductDescription from "../Cartdescrip/page";
import Fooditem from "../Fooditem/page";
import Header from "../components/Header";
export default function ProductCard() {
    return (
        <>      <Header/>
        <div className="ParentCart">
              <div className="HeadingSection2">
                <span>
                    Home <FaLongArrowAltRight /> Shop
                </span>
            </div>
      <div className="product-card-container">
        {/* Left Section: Main Product Image + Thumbnails */}
        <div className="product-left-section">
          <div className="product-image-section">
            <Image src="/carousel-inner.png" alt="Yellow Sofa" width={300} height={300} className="img"/>
          </div>
          <div className="product-thumbnail-section">
            <Image src="/single.jpg" alt="Chair Thumbnail" className="thumbnail-image" width={300} height={100}/>
            <Image src="/single2.jpg" alt="Sofa Thumbnail" className="thumbnail-image" width={300}  height={100}/>
          </div>
        </div>
  
        {/* Right Section: Product Details */}
        <div className="product-details-section">
          <h2 className="product-title">Floating Phone</h2>
          <div className="product-rating">
            ★★★★☆ <span className="review-count">10 Reviews</span>
          </div>
          <p className="product-price">$1,139.33</p>
          <p className="product-availability">
            Availability: <span className="availability-status">In Stock</span>
          </p>
          <p className="product-description">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
          </p>
  
          {/* Color Options */}
          <div className="color-selection">
            <div className="color-option blue"></div>
            <div className="color-option green"></div>
            <div className="color-option orange"></div>
            <div className="color-option black"></div>
          </div>
  
          {/* Action Button */}
          <button className="product-action-button">Select Options</button>
  
          {/* Additional Icons */}
          <div className="product-action-icons">
            <button className="icon-button">♥</button>
            <button className="icon-button">🛒</button>
            <button className="icon-button">👁</button>
          </div>
        </div>
      </div>
      <ProductDescription/>
      <Fooditem/>
    </div>
</>
    );
  }
  