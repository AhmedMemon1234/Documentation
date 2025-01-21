import Hero from "./hero/page";
import Featured from "./Featured/page";
import Bestsell from "./Bestselling/page";
import Banner from "./downbanner/page";
import Banner2 from "./NeuralBanner/page";
import FeaturedPosts from "./Featuredpost/page";
import Header from "./components/Header";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

// Fetching the products data from Sanity
export async function getServerSideProps() {
  const query = `*[_type == "product"] | order(_createdAt asc){
    name,
    description,
    price,
    priceWithoutDiscount,
    discountPercentage,
    image,
    slogan,
    isNew,
    "slug": slug.current
  }`;
  const products = await client.fetch(query);
  return { props: { products } };
}

export default function Home({ products }: { products: any[] }) {
  return (
    <div>
      <Header />
      <Hero />
      <Featured />
      <div className="heading mt-20">
        <h2>Featured Products</h2>
        <h3>Bestseller Products</h3>
        <p>Problems trying to resolve the conflict between</p>
      </div>
      <div className="flex-wrap flex justify-center">
        {products.slice(0, 8).map((product) => (
          <Bestsell key={product.slug} product={product} />
        ))}
      </div>
      <Banner />
      <Banner2 />
      <FeaturedPosts />
    </div>
  );
}
