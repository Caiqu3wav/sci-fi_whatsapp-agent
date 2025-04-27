import Header from "./components/sections/Header"
import Hero from "./components/sections/Hero"
import Recourses from "./components/sections/Recourses"

export default function Home() {
  return (
    <main className="min-h-[700px] flex flex-col items-center justify-around">
      <Header/>
      <Hero/>
      <Recourses/>
    </main>
  )
}