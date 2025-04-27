import Header from "./components/sections/Header"
import Hero from "./components/sections/Hero"
import Recourses from "./components/sections/Recourses"
import {Footer} from "./components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-[700px] flex flex-col items-center justify-around">
      <Header/>
      <Hero/>
      <Recourses/>
      <Footer/>
    </main>
  )
}