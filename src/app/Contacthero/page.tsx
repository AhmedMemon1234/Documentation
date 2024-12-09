import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
export default function Contacthero(){
    return(
        <div className="Parentcontact">
<div className="Childcontact">
    <h4>CONTACT US</h4>
    <h1>Get In Touch today!</h1>
    <p>We know how large objects will act. <br />but things on a small scale</p>
    <h2>Phone : +451 215 215</h2>
    <h3>Fax : +451 215 215</h3>
    <span><FaFacebook/><FaInstagram/><FaTwitter/><FaLinkedin/></span>
</div>
<Image src={"/hero-2-bg-shape-cover.png"} alt='Heropic' width={1000} height={100} className='Heropic'/>
        </div>
    )
}