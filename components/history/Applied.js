/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import { WiTime10 } from "react-icons/wi";

import { formatDistanceToNow } from 'date-fns';

const Applied = () => {
    const [jobs, setjobs] = useState([]);
    
  
    useEffect(() => {

      const fetchAppliedJobs = () =>{

        var myHeaders = new Headers();
        myHeaders.append("Cookie", `token=${getCookie("token")}`);
        var requestOptions = {
        method: 'GET',
        headers:myHeaders,
        credentials:'include',
        redirect: 'follow'
        };
  
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/candidate/myAppliedJobs`, requestOptions)
        .then(response => response.json())
        .then(result => {
            
            if(result.success){
                setjobs(result.jobs.reverse())
                
            }
        })
        .catch(error => console.log('error', error));
      }


      fetchAppliedJobs()
    }, []);
  
  return (
    <div className="jobs-section mt-5 p-2">
      <div className=" py-1 w-full text-center">
        <h1 className="text-lg font-bold">Applied Jobs <span className="">({jobs.length})</span>
        </h1>
      </div>
      
            {jobs?.length ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6  ml-20 mr-20  mt-5">
          {jobs
          
          .map((job) => (
            <div
            
              id="job-card"
              key={job._id}
              className="bg-white p-5 rounded-3xl mb-8 hover:bg-gradient-to-br hover:from-blue_color hover:to-yellow_color hover:text-white flex flex-col justify-between h-auto border border-r-6 border-gray-300 shadow-md "
            >
              {/* Company Logo */}
              {getCookie("user")==="recruiter"?(
              <Image src={job?.avatar} alt="Company Logo" className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-white border" height={100} width={100} />

              ):(
                <Image src={job?.owner?.avatar} alt="Company Logo" className="mx-auto rounded-full mb-3 w-16 h-16 bg-white " height={100} width={100} />

              )}

              {/* Company Name and Title */}
              <div className="flex flex-col mb-5">
                <p className="text-center text-sm mb-2">{job?.owner?.name}</p>
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

                <div>
                    <Link
                    
                    href={`/jobDetails/${job._id}`}
                    className="login-btn bg-black_color text-white px-4 py-2 rounded-full hover:bg-white hover:text-black"
                  >
                    Give Interview
                  </Link>
                  

                  </div>


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
      
      
    </div>
  );
};

export default Applied;
