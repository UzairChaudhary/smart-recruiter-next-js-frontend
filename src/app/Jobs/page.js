"use client"
import React, { useEffect, useState } from "react";
import HeroSection from "../../../components/HeroSection";
import JobSearchForm from "../../../components/SearchJob";
import JobSection from "../../../components/Jobs";
import BackToTopButton from '../../../components/BackToTopButton'
import Loader from "../../../loaders/Loader"
import Footer from "../../../components/Footer";

const Jobs = () => {
  const [renderComponents, setRenderComponents] = useState(false);

  useEffect(() => {
    // Set a timeout to render all components after a certain time interval (e.g., 3000 milliseconds or 3 seconds)
    const timeoutId = setTimeout(() => {
      setRenderComponents(true);
    }, 500); // Adjust the time interval as needed

    // Cleanup function to clear the timeout if the component unmounts before the timeout
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array ensures that this effect runs only once on mount


  const [showButton, setShowButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  // Loader when page is loading
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      setShowLoader(false);
    });

    // Show/Hide scroll to top button
    window.addEventListener("scroll", () => {
      window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
    });
  }

  return (
    <>
      {renderComponents ? (
        <>
          <div className='w-full h-full bg-hero-gradient opacity-20 py-20 '>
          </div>
          <h1 className='text-2xl font-poppins absolute top-32 left-1/4  text-black_color font-bold'>All Jobs</h1>
          <h1 className='text-md font-poppins absolute top-40 mt-1 left-1/4  text-black_color '>Jobs posted by different companies</h1>

          
          <BackToTopButton showButton={showButton} />
          <JobSearchForm />
          <JobSection />
          <Footer/>
        </>
      ):(
        <Loader/>
      )}
    </>
  );
};

export default Jobs;
