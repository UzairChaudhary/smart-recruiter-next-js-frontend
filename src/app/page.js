"use client"
import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import JobSearchForm from "../../components/SearchJob";
import JobSection from "../../components/Jobs";

const Home = () => {
  const [renderComponents, setRenderComponents] = useState(false);

  useEffect(() => {
    // Set a timeout to render all components after a certain time interval (e.g., 3000 milliseconds or 3 seconds)
    const timeoutId = setTimeout(() => {
      setRenderComponents(true);
    }, 1000); // Adjust the time interval as needed

    // Cleanup function to clear the timeout if the component unmounts before the timeout
    return () => clearTimeout(timeoutId);
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <>
      {renderComponents && (
        <>
          <HeroSection />
          <JobSearchForm />
          <JobSection />
        </>
      )}
    </>
  );
};

export default Home;
