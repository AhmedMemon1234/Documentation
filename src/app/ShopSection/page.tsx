import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import FilterRow from "../FIlter/page";
import LogoRow from "../brandbanner/page";
import Bestproduct from "../Downproduct/page";
import Header from "../components/Header";
export default function Shop() {
    return (
        <>            <Header/>

        <div className="Parentshop">
            {/* Heading Section */}
            <div className="HeadingSection">
                <h1>Shop</h1>
                <span>
                    Home <FaLongArrowAltRight /> Shop
                </span>
            </div>

            {/* Cards Section */}
            <div className="Childshop">
                <div className="Card">
                    <Image
                        src="/card-item.png"
                        alt="Cloths"
                        width={205}
                        height={223}
                        className="Cardimg"
                    />
                    <div className="CardOverlay">
                        <h3>CLOTHS</h3>
                        <p>5 Items</p>
                    </div>
                </div>
                <div className="Card">
                    <Image
                        src="/col-md-4 (1).png"
                        alt="Cloths"
                        width={205}
                        height={223}
                        className="Cardimg"
                    />
                    <div className="CardOverlay">
                        <h3>CLOTHS</h3>
                        <p>5 Items</p>
                    </div>
                </div>
                <div className="Card">
                    <Image
                        src="/card-item (1).png"
                        alt="Cloths"
                        width={205}
                        height={223}
                        className="Cardimg"
                    />
                    <div className="CardOverlay">
                        <h3>CLOTHS</h3>
                        <p>5 Items</p>
                    </div>
                </div>
                <div className="Card">
                    <Image
                        src="/card-item (2).png"
                        alt="Cloths"
                        width={205}
                        height={223}
                        className="Cardimg"
                    />
                    <div className="CardOverlay">
                        <h3>CLOTHS</h3>
                        <p>5 Items</p>
                    </div>
                </div>
                <div className="Card">
                    <Image
                        src="/card-item (3).png"
                        alt="Cloths"
                        width={205}
                        height={223}
                        className="Cardimg"
                    />
                    <div className="CardOverlay">
                        <h3>CLOTHS</h3>
                        <p>5 Items</p>
                    </div>
                </div>
            </div>
            <FilterRow/>
            <LogoRow/>
            <Bestproduct/>
            
        </div>
        </>
    );
}
