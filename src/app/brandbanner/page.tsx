import Image from "next/image";
export default function LogoRow() {
    return (
        <div className="logo-row">
        <Image src="/col-md-2.png" alt="Hooli" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (1).png" alt="Lyft" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (2).png" alt="Leaf" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (3).png" alt="Stripe" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (4).png" alt="AWS" className="logo"  width={300} height={100}/>
        <Image src="/col-md-2 (5).png" alt="Reddit" className="logo" width={300} height={100}/>
      </div>
    );
  }
  