import Image from 'next/image';

export default function Banner() {
  return (
    <div className="banner">
      <div className="text-container">
        <p className="sub-heading">SUMMER 2020</p>
        <h1 className="main-heading">Vita Classic Product</h1>
        <p className="description">
          We know how large objects will act, but things on a small scale.
        </p>
        <div className="price-container">
          <p className="price">$16.48</p>
          <button className="add-to-cart">ADD TO CART</button>
        </div>
      </div>
      <div className="image-container">
        <Image
          src="/man.png"
          alt="Product Image"
          layout="intrinsic"
          width={500}
          height={500}
          priority
        />
      </div>
    </div>
  );
}
