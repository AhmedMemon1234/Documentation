import Image from "next/image";

export default function ProductDescription() {
    return (
        <div className="Parentpro">
            <div className="h1">Description &nbsp; &nbsp; &nbsp; Additionial Information  &nbsp; &nbsp; &nbsp; Reviews (0)</div>
      <div className="product-description-container">
        {/* Left Section: Image */}
        <div className="description-image">
          <Image src="/col-md-4 (2).png" alt="Room Setup" width={300} height={100}/>
        </div>
  
        {/* Middle Section: Paragraphs */}
        <div className="description-text">
          <h2 className="description-title">the quick fox jumps over</h2>
          <p>
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <p>
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
          <p>
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequent door ENIM RELIT Mollie. Excitation venial
            consequent sent nostrum met.
          </p>
        </div>
  
        {/* Right Section: List */}
        <div className="description-list">
          <h2 className="description-title">the quick fox jumps over</h2>
          <ul>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
          </ul>
          <h2 className="description-title">the quick fox jumps over</h2>
          <ul>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
            <li>the quick fox jumps over the lazy dog</li>
          </ul>
        </div>
      </div>
</div>
    );
  }
  