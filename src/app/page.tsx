
import Hero from "./hero/page"
import Featured from "./Featured/page"
import Bestsell from "./Bestselling/page"
import Banner from "./downbanner/page"
import Banner2 from "./NeuralBanner/page"
import FeaturedPosts from "./Featuredpost/page"
import Header from "./components/Header"
export default function Home(){
  return(
    <div>
      <Header/>
<Hero/>
<Featured/>
<Bestsell/>
<Banner/>
<Banner2/>
<FeaturedPosts/>
    </div>
  )
}