import Image from "next/image";

export default function Bestproduct() {
    const productImages = [
      "/fixed-height.png", // First card
      "/fixed-height (1).png", // First card
      "/fixed-height (2).png", // First card
      "/fixed-height (3).png", // First card
      "/fixed-height (4).png", // First card
      "/fixed-height (5).png", // First card
      "/fixed-height (6).png", // First card
      "/fixed-height (7).png", // First card
      "/fixed-height (8).png", // First card
      "/fixed-height (9).png", // First card
      "/fixed-height (10).png", // First card
      "/fixed-height (11).png", // First card

    ];
    return (
      <div className="product-section">
        <div className="product-list">
          {productImages.map((image, index) => (
            <div className="card" key={index}>
              <div className="image-wrapper">
                <Image
                  src={image} // Dynamically load image
                  alt={`Product ${index + 1}`} // Dynamic alt text
                  width={200}
                  height={100}
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
        <Image src={"/ul.png"} alt="Ul" width={300} height={100} className="list"/>
      </div>
    );
  }
  