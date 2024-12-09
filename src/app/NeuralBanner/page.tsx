import Image from 'next/image';

export default function Banner2() {
  return (
    <div className="banner2">
      <div className="banner-image2">
        <Image
          src="/hero-cover-1.png"
          alt="Winter Collection"
          layout="intrinsic"
          width={500}
          height={500}
          priority
        />
      </div>
      <div className="banner-text2">
        <p className="sub-heading2">SUMMER 2020</p>
        <h1 className="main-heading2">Part of the Neural Universe</h1>
        <p className="description2">
          We know how large objects will act, but things on a small scale.
        </p>
        <div className="button-group2">
          <button className="primary-button2">BUY NOW</button>
          <button className="secondary-button2">READ MORE</button>
        </div>
      </div>
    </div>
  );
}
