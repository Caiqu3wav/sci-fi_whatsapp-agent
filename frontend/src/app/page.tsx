import Header from "./components/sections/Header"
import Hero from "./components/sections/Hero"

export default function Home() {
  return (
    <main className="min-h-[600px] flex flex-col items-center justify-around">
      <Header/>
      <Hero/>
    </main>
  )
}