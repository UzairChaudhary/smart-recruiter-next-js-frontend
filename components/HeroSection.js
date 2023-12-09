/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <div className="relative p-4 mt-1">
        <div className="flex flex-col md:flex-row justify-center items-center p-5 ml-1 space-x-40 relative z-10">
          <div className="flex flex-col justify-center mr-5 mt-5 text-center md:text-left ">
            <div className="mb-2 ">
              <p className="text-4xl text-black p-1">Let's Get You Recruited</p>
              <p className="text-4xl text-black p-1">In Your Dream Job With</p>
              <p className="text-4xl font-semibold text-black p-1">Smart Recruiter</p>
            </div>
            <div>
              <Image alt="Hero" src="/line.png" width={212} height={12} className="mb-8 ml-2"></Image>
            </div>
            <div>
              <p>Elevate Your Recruitment Game with Smart Recruiter</p>
              <p>Unleashing the Power of AI for Smarter, Data-Driven Decisions.</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image alt="Hero" src="/hero-section-img.png" width={490} height={437} className="mb-2 p-3"></Image>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="bg-hero-gradient opacity-50 w-full h-full"></div>
        </div>
      </div>
      
    </>
  );
}
