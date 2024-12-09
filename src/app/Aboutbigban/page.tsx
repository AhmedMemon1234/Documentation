import Image from "next/image";

export default function Aboutbigban(){
    return(
        <div className="ParentAboutban">
            <div className="ChildAboutban">
                <Image src={"/container (3).png"} alt="Aboutimg" width={300} height={100} className="Aboutimg"/>
            </div>
        </div>
    )
}