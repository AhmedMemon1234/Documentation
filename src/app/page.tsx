// src/app/page.tsx
import Hero from "./hero/page";
import Featured from "./Featured/page";
import Bestsell from "./Bestselling/page";
import Banner from "./downbanner/page";
import Banner2 from "./NeuralBanner/page";
import FeaturedPosts from "./Featuredpost/page";
import Header from "./components/Header";
import { client } from "@/sanity/lib/client";
import { Types } from "./Type";

// Home page component
export default async function Home() {
  const query = `*[_type == "product"] | order(_createdAt asc){
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

  // Fetching products directly in page component
  const products = await client.fetch(query);

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
        {products.slice(0, 8).map((product:Types) => (
          <Bestsell key={product.slug} product={product} />
        ))}
      </div>
      <Banner />
      <Banner2 />
      <FeaturedPosts />
    </div>
  );
}
