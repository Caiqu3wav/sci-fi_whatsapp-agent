import Header from "./components/sections/Header"
import Hero from "./components/sections/Hero"
import Recourses from "./components/sections/Recourses"
import {Footer} from "./components/sections/Footer"
import HowItWorks from "./components/sections/HowItWorks"
import PricingShow from "./components/sections/PricingShow"

export default function Home() {
  return (
    <main className="min-h-[700px] flex flex-col items-center justify-around">
      <Header/>
      <Hero/>
      <Recourses/>
      <HowItWorks/>
      <PricingShow/>
      <Footer/>
    </main>
  )
}