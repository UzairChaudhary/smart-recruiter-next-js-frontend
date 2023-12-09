import Image from "next/image"
import HeroSection from "../../components/HeroSection"
import JobSearchForm from '../../components/SearchJob';
import JobSection from '../../components/Jobs';
export default function Home() {
  return (
    <>
      <HeroSection />
      <JobSearchForm />
      <JobSection/>
    </>
      
        
  )
}
