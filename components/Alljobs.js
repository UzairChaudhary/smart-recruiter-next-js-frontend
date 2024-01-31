"use client"
import Image from "next/image";
import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getCookie,hasCookie } from "cookies-next";

import { WiTime10 } from "react-icons/wi";

import LoginSignupScreen from './LoginSignupScreen';

import { useRouter, usePathname } from "next/navigation";

import { toast } from 'react-hot-toast';

import { formatDistanceToNow } from 'date-fns';

const AllJobs = () => {

  const [jobsArray, setJobsArray] = useState([]);
  const { dispatch,searchedJob } = useUiContext();
  const [isLoginScreenOpen, setLoginScreenOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
  const router = useRouter();

  const pathname = usePathname();
  
  // Use the pathname of the current route to determine if the link should be active
  const isJobsPage = pathname === '/Jobs';

  const handleLoginClick = () => {
    setLoginScreenOpen(true);
    dispatch({ type: actioTypes.openLoginSidebar })
    
  };

  const handleLoginScreenClose = () => {
    setLoginScreenOpen(false);
    dispatch({ type: actioTypes.closeLoginSidebar })
    
  };
  
  const handleUserAuthentication = (e,id) => {

    e.preventDefault()
    
    if ((getCookie("user")==="candidate") && hasCookie("token")){
      router.push(`/apply/${id}`)
    }
    else{
      handleLoginClick()
      toast.error("Please login first")
      

      
    }
  };


  useEffect(() => {
      //console.log('login as: ',getCookie("user"))
      // Fetch data from the API using the token
      const fetchData = async () => {

        const requestOptions = {
          method: "GET",
          credentials: 'include',  
          redirect: "follow",
        };

        try {
          //console.log("jobs page recruiter cookie: ", hasCookie("recruiter"));
          const apiUrl = hasCookie("recruiter") ?
        'http://localhost:3000/api/v1/recruiter/myprofile' :
        'http://localhost:3000/api/v1/job/getJobs';
          const response = await fetch(
            apiUrl,
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          if(hasCookie("recruiter")){
            //console.log(data);
            setJobsArray(data.recruiter.jobs);
          }
          else{
            setJobsArray(data.jobs);

          }
          
          //console.log(jobsArray)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    
  }, []);

  // Limit the array 
  var displayedJobs=[];
  var displayedJobCategories=[];
  displayedJobs = jobsArray.slice().reverse();
  const jobTitlesSet = new Set(jobsArray.map(job => job.title));
  displayedJobCategories = Array.from(jobTitlesSet).slice().reverse().slice(0,5);
 
  

  //Handling category selection

  const categoryContainerRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (categoryContainerRef.current && !categoryContainerRef.current.contains(event.target)) {
        setselectedCategory(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setselectedCategory]);

  return (
    <div className="job-section ml-6">
      {getCookie("user")==="candidate"? (
        <h2 className="text-4xl font-medium mt-10 flex md:ml-40 mb-4">Popular Jobs</h2>
      ):(
        <h2 className="text-4xl font-medium mt-10 flex md:ml-40 mb-4">My Jobs</h2>
      )}
      
      <div className="bg-white py-4 flex items-center md:ml-40 mb-6">
        <div ref={categoryContainerRef} className="flex space-x-4">
          {displayedJobCategories.map((category, index) => (
            <div 
            key={index} 
            onClick={()=>{
              setselectedCategory(category)
            }}
            
            className={`${selectedCategory ===category ? 'bg-black_color text-white ' : ' hover:bg-black_color hover:text-white '} text-black_color cursor-pointer p-3 rounded-full `}
            
            >
              {category}
            </div>
          ))}
        </div>
        {getCookie("user")==="recruiter" &&(
          <button className="bg-teal_color text-white py-2 px-4 rounded-md ml-auto cursor-pointer pr-5 mr-40">
              <Link href="/">+ Post Job</Link>
            </button>
        )}
        
      </div>
      {displayedJobs?.length ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:ml-40 pr-40">
          {displayedJobs
          .filter(
            (job) =>
              (searchedJob === '' ||
                job.title.toLowerCase().includes(searchedJob.toLowerCase())) &&
              (selectedCategory === null || job.title === selectedCategory)
          )
          .map((job) => (
            <div
            
              id="job-card"
              key={job._id}
              className="bg-white p-5 rounded-3xl mb-8 hover:bg-gradient-to-br hover:from-blue_color hover:to-yellow_color hover:text-white flex flex-col justify-between h-auto border border-r-6 border-gray-300 shadow-md "
            >

                
              {/* Company Logo */}
              <Image src="/next.svg" alt="Company Logo" className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-white border" height={100} width={100} />

              {/* Company Name and Title */}
              <div className="flex flex-col mb-5">
                <p className="text-center text-xs mb-2">{job.owner.name}</p>
                <p className="text-center font-medium text-lg ">{job.title}</p>
              </div>

              {/* Job Skills */}
              <div className="flex flex-wrap justify-center mb-auto flex-shrink-0 ">
                {job.skills.slice(0,5).map((skill, index) => (
                  <span key={index} className="bg-white border border-gray-400 text-blue_color rounded-full px-3 py-1 text-sm mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Job Type */}
              <div className="flex flex-wrap justify-center flex-shrink-0 mb-5 mt-5">
                {job.jobType &&
                  job.jobType.split(',').map((type, index) => (
                    <span key={index} id="job-type" className="text-black_color rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      {type.trim()}
                    </span>
                  ))}
              </div>
              

              {/* Employment Type and Apply Button */}
              <div className="flex justify-between items-center mt-auto">
                <p className="flex items-center text-sm text-black_color text-center">
                  <WiTime10 className="mr-1 mb-1 mt-1 flex-shrink-0 h-4 w-4" />
                  {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }).replace(/^about\s/, '')}
                </p>

                {getCookie("user") === "candidate" ? (
                  <div>
                    <button
                    
                    onClick={(e) => handleUserAuthentication(e, job._id)}
                    className="bg-black_color text-white px-6 py-2 rounded-full hover:bg-white hover:text-black"
                  >
                    Apply
                  </button>
                  {isLoginScreenOpen && (
                      <div
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 z-50"
                        
                      ></div>
                    )}
                  {isLoginScreenOpen && <LoginSignupScreen onClose={handleLoginScreenClose} />}

                  </div>
                

                ) : (
                  <button className="bg-black_color text-white px-6 py-2 rounded-full hover:bg-white hover:text-black">
                    Details
                  </button>
                  
                )}


              </div>
            </div>
          ))}
           
        </div>
        

      ):(
        <div className="flex-center-center mt-5">
                <div className="image-wrapper">
                  <img
                    src="/404.png"
                    alt="404"
                    className="mx-auto  object-contain h-[350px] w-[350px]"
                  />
                  <h1 className="text-center text-black_color mt-5 text-3xl opacity-70">
                    Oops! No jobs found
                  </h1>
                </div>
              </div>
      
      )}
      {displayedJobs?.length && displayedJobs
            .filter(
            (job) =>
                (searchedJob === '' ||
                job.title.toLowerCase().includes(searchedJob.toLowerCase())) &&
                (selectedCategory === null || job.title === selectedCategory)
            ).length === 0 ? (
                <div className="flex-center-center mt-5">
                <div className="image-wrapper">
                  <img
                    src="/404.png"
                    alt="404"
                    className="mx-auto  object-contain h-[350px] w-[350px]"
                  />
                  <h1 className="text-center text-black_color mt-5 text-3xl opacity-70">
                    Oops! No jobs found
                  </h1>
                </div>
              </div>
    ):(
        <></>
        
    )}
    </div>
  );
};

export default AllJobs;
