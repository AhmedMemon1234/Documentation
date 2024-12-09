import Image from "next/image";

export default function Featured(){
   return(
    <div className="Parentfeatured">
<div className="Childfeatured">
    <h1>EDITOR&lsquo;S PICK</h1>
    <p>Problems trying to resolve the conflict between</p>
    <Image src={"/man1.png"} alt="Man1" width={300} height={100} className="Man1"/>
    <Image src={"/man2.png"} alt="Man2" width={300} height={100} className="Man2"/>
    <Image src={"/man3.png"} alt="Man3" width={300} height={100} className="Man3"/>
    <Image src={"/man4.png"} alt="Man4" width={300} height={100} className="Man4"/> 
</div>
    </div>
   )
}