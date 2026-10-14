import About from '@/components/About'
import Contact from '@/components/Contact'
import Faq from '@/components/Faq'
import Hero from '@/components/Hero'
import Process from '@/components/Process'
import Rotating from '@/components/Rotating'
import Services from '@/components/Services'

const page = () => {
  return (
    <div>
      <Hero />
      <Rotating />
      <About />
      <Services />
      <Process />
      <Faq />
      <Contact />
    </div>
  )
}

export default page
