import Image from "next/image";

export default function Hero(){
    return(
        <div className="Parenthero">
            <div className="Childhero">
                <Image src={"/hero.jpg"} alt="Hero" width={1200} height={100} className="Heroimg"/>
                <Image src={"/product-slide-1.jpg"} alt="Mob" width={300} height={100} className="Mobhero"/>
                <h1 className="Summer">Summer 2020</h1>
                <h1 className="Collection">NEW COLLECTION</h1>
                <h4 className="paragraph">We know how large objects will act. but things on a small scale</h4>
                <button className="Shopnow">SHOP NOW</button>
            </div>
        </div>
    )
}