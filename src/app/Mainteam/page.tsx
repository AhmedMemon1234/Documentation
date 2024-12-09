import Image from 'next/image';

export default function FashionGrid() {
  return (
    <div className="fashion-grid">
      {/* Large Image */}
      <div className="large-image">
        <Image 
          src="/imageteam1.png" 
          alt="Large Fashion Item" 
          width={700} 
          height={100} 
          className='imageteamlarge'
        />
      </div>
      {/* Small Images */}
      <div className="small-images">
        <div className="small-image">
          <Image 
          src="/imageteam2.png" 
          alt="Fashion Item 1" 
            width={400} 
            height={500} 
            className='imageteam'

          />
        </div>
        <div className="small-image">
          <Image 
          src="/imageteam3.png" 
          alt="Fashion Item 2" 
            width={400} 
            height={500} 
            className='imageteam'

          />
        </div>
        <div className="small-image">
          <Image 
          src="/imageteam4.png" 
          alt="Fashion Item 3" 
            width={400} 
            height={500} 
            className='imageteam'

          />
        </div>
        <div className="small-image">
          <Image 
          src="/imageteam5.png" 
          alt="Fashion Item 4" 
            width={400} 
            height={500} 
            className='imageteam'
          />
        </div>
      </div>
    </div>
  );
}
