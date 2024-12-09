import Image from "next/image";

export default function CTA() {
  return (
    <div className="cta-container2">
      <div className="cta-arrow2">
        <Image src="/Arrow 2.png" alt="Arrow" width={40} height={40} />
      </div>
      <p className="cta-subheading2">WE CAN'T WAIT TO MEET YOU</p>
      <h1 className="cta-heading2">Let's Talk</h1>
      <button className="cta-button2">Try it free now</button>
    </div>
  );
}
