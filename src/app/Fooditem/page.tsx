import Image from 'next/image';

export default function Fooditem() {
  return (
    <div className="container50">
      <h1 className="title50">BESTSELLER PRODUCTS</h1>
      <div className="grid50">
        <div className="card50">
          <Image src="/product-cover-5.png" alt="Product 1" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>

        <div className="card50">
          <Image src="/fixed-height (12).png" alt="Product 2" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>

        <div className="card50">
          <Image src="/fixed-height (13).png" alt="Product 3" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>

        <div className="card50">
          <Image src="/fixed-height (14).png" alt="Product 4" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>
        <div className="card50">
          <Image src="/fixed-height (15).png" alt="Product 4" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>
        <div className="card50">
          <Image src="/fixed-height (16).png" alt="Product 4" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>
        <div className="card50">
          <Image src="/fixed-height (17).png" alt="Product 4" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>
        <div className="card50">
          <Image src="/fixed-height (18).png" alt="Product 4" width={300} height={200} className="image50" />
          <div className="details50">
            <h3>Graphic Design</h3>
            <p>English Department</p>
            <p className="price50">
              <span className="oldPrice50">$16.48</span> <span className="newPrice50">$6.48</span>
            </p>
          </div>
        </div>
      </div>
      <div className="logo-row">
        <Image src="/col-md-2.png" alt="Hooli" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (1).png" alt="Lyft" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (2).png" alt="Leaf" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (3).png" alt="Stripe" className="logo" width={300} height={100}/>
        <Image src="/col-md-2 (4).png" alt="AWS" className="logo"  width={300} height={100}/>
        <Image src="/col-md-2 (5).png" alt="Reddit" className="logo" width={300} height={100}/>
      </div>
    </div>
  );
}
