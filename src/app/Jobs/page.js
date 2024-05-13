"use client"
import React, { useEffect, useState } from "react";
import JobSearchForm from "../../../components/SearchJob";
import AllJobs from "../../../components/Alljobs";
import BackToTopButton from '../../../components/BackToTopButton'
import { getCookie } from "cookies-next";
import RingLoader from "../../../loaders/RingLoader"
import Footer from "../../../components/Footer";
import Navbar from "../../../components/navbar";

const Jobs = () => {
  const [renderComponents, setRenderComponents] = useState(false);

  useEffect(() => {
    // Set a timeout to render all components after a certain time interval (e.g., 3000 milliseconds or 3 seconds)
    const timeoutId = setTimeout(() => {
      setRenderComponents(true);
    }, 1000); // Adjust the time interval as needed

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
    <Navbar/>
      {renderComponents ? (
        <>
          <div className='w-full h-full bg-hero-gradient opacity-20 py-20 pb-32 '>
          </div>
          {getCookie("user")==="recruiter" ? (
            <h1 className='text-2xl font-poppins absolute top-32 left-40  text-black_color font-bold'>Your Posted Jobs</h1>

          ):(
            <h1 className='text-2xl font-poppins absolute top-32 left-40  text-black_color font-bold'>Find Your Dream Job</h1>

          )}
          <h1 className='text-md font-poppins absolute top-40 mt-1 left-40  text-black_color'>Home / Jobs</h1>

          
          <BackToTopButton showButton={showButton} />
          <JobSearchForm />
          <AllJobs />
          <Footer/>
        </>
      ):(
        <RingLoader/>
      )}
    </>
  );
};

export default Jobs;
