import Image from "next/image";

export default function Aboutbig(){
  return (
    <div className="grow-yours-container">
      <div className="grow-yours-content">
        <h5 className="grow-yours-subheading">WORK WITH US</h5>
        <h1 className="grow-yours-heading">Now Let’s Grow Yours</h1>
        <p className="grow-yours-description">
          The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th.
        </p>
        <button className="grow-yours-button">Button</button>
      </div>
      <Image 
          src="/women.png" 
          alt="Model" 
          layout="intrinsic" 
          width={500} 
          height={750} 
          className="imgbig"
        />
    </div>
  );
};

