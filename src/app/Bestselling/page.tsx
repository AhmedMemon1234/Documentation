import Image from "next/image";

export default function Bestsell() {
    const productImages = [
      "/women1.png", // First card
      "/women2.png", // Second card
      "/women3.png", // Third card
      "/women4.png", // Fourth card
      "/women5.png", // Fifth card
      "/women6.png", // Sixth card
      "/women7.png", // Seventh card
      "/women8.png", // Eighth card
    ];
    return (
      <div className="product-section">
        <div className="heading">
          <h2>Featured Products</h2>
          <h3>Bestseller Products</h3>
          <p>Problems trying to resolve the conflict between</p>
        </div>
        <div className="product-list">
          {productImages.map((image, index) => (
            <div className="card" key={index}>
              <div className="image-wrapper">
                <Image
                  src={image} // Dynamically load image
                  alt={`Product ${index + 1}`} // Dynamic alt text
                  width={1000}
                  height={1000}
                  className="product-image"
                />
              </div>
              <div className="content">
                <h3 className="title">Graphic Design {index + 1}</h3>
                <p className="subtitle">English Department</p>
                <div className="price-wrapper">
                  <span className="old-price">$16.48</span>
                  <span className="new-price">$6.48</span>
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
      </div>
    );
  }
  