'use client'
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function ElectronicCategory(){
    const [filters,setFilters] = useState<any[]>([])
    const [price,setPrice] = useState({
        priceRange:[0,1000]
    })
    const [search,setSearch] = useState("")
    const [products,setProducts] = useState<any[]>([])
    const {isSignedIn} = useUser()
    const router = useRouter()
    const fetchData = async()=>{
const query = `*[_type == "product"] | order(_createdAt asc)[20..32]{
      name,
      description,
      price,
      priceWithoutDiscount,
      discountPercentage,
      image,
      
      rating,
      slogan,
      isNew,
      "slug":slug.current
    }`;
    const data = await client.fetch(query);
    setProducts(data);
    setFilters(data);
    }
    const HandleProductClick = (slug:string)=>{
      if(!isSignedIn){
        router.push("/login")
      }
      else{ 
        router.push(`/productdetails/${slug}`)
      }
    }
    const handlefilter = (key:string, value:any)=>{
      setPrice((prev)=>({
        ...prev,
        [key]:value,
      }))
    }

    const Applyfilter = ()=>{
        let updateProduct = products;
        if(price.priceRange){
            updateProduct = updateProduct.filter((product)=>
             product.price >= price.priceRange[0]&&
             product.price <= price.priceRange[1]
            )
            setFilters(updateProduct)
        }
    }
    useEffect(()=>{
        Applyfilter()
    },[price])
  const Searchterm = (event:React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearch(term)
    if(term){
        const filtered = products.filter((product)=>
            product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilters(filtered)
    }
    else{
        setFilters(products)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
    return(
        <>
        <Header/>
        <div className="product-section">
          <h1 className="text-center text-4xl font-semibold -mt-12 lg:text-6xl">Categories</h1>
          <div className="text-center">
          <input
            type="text"
            value={search}
            onChange={Searchterm}
            placeholder="Search products"
            className="mt-10 shadow-lg border-2 border-black p-3 w-full" // You can style this as needed
          />
          
          </div>
          <div className="flex justify-center gap-4 mb-4 mt-16 flex-wrap">
          <label className="block text-lg font-semibold mb-2">Price Range:</label>
      <input
        type="number"
        value={price.priceRange[0]} // Minimum price value
        onChange={(e) =>
          handlefilter("priceRange", [
            parseInt(e.target.value, 10), // Minimum price update karo
            price.priceRange[1],
          ])
        }
        className="p-2 border rounded-md w-28 border-black"
        placeholder="Min"
      />
      <span className="text-lg">to</span>
      <input
        type="number"
        value={price.priceRange[1]} // Maximum price value
        onChange={(e) =>
          handlefilter("priceRange", [
            price.priceRange[0],
            parseInt(e.target.value, 10), // Maximum price update karo
          ])
        }
        className="p-2 border rounded-md w-28 border-black"
        placeholder="Max"
      />
    </div>
    
          <div className="flex-wrap flex justify-center gap-[12px] p-[20px]">
            {filters.map((product, index) => (
              <div className="card" key={index} onClick={()=>HandleProductClick(product.slug)}>
                <Link href={`/productdetails/${product.slug}`}>
                  <Image
                    src={urlFor(product.image)}
                    alt={product.name}
                    width={500}
                    height={300}
                    className="object-cover"
                  />
                  <div className="content">
                    <h3 className="text-2xl font-semibold text-center">{product.name}</h3>
                    <p className="text-gray-500 text-center">{product.slogan}</p>
                    <div className="price-wrapper">
                      <span className="old-price">${product.priceWithoutDiscount}</span>
                      <span className="new-price">${product.price}</span>
                    </div>
                    <div className="color-options">
                      <span className="color blue"></span>
                      <span className="color green"></span>
                      <span className="color orange"></span>
                      <span className="color brown"></span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 p-4">
            <button className="py-2 px-4 rounded bg-gray-200 text-gray-500">First</button>
            <button className="py-2 px-4 rounded bg-blue-500 text-gray-200">1</button>
            <button className="py-2 px-4 rounded hover:bg-gray-100 bg-gray-200">Soon...</button>
          </div>
          </div>
        </>
    )
}