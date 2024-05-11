/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import { WiTime10 } from "react-icons/wi";

import { formatDistanceToNow } from 'date-fns';

const Offers = () => {
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

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/candidate/myJobOffers`, requestOptions)
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
    <div className=" p-2">
      <div className=" py-1 w-full text-center">
        <h1 className="font-bold text-lg">
          Job Offers <span className=" ">({jobs.length})</span>
        </h1>
      </div>
      {jobs?.length ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6  ml-20 mr-20  mt-5">
        {jobs?.map((job) => (
          <div
            className="shadow-light group w-80 rounded-lg p-3 mt-3"
            key={job._id}
          >
            <div className="flex justify-between">
              <div className="flex-align-center gap-2">
              <Image src={job?.avatar} alt="Company Logo" className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-white border" height={100} width={100} />

                <div>           
                  <h1 className="text-lg font-bold capitalize">{job.owner.name}</h1>
                  <p className="text-sm">{job.jobType}</p>
                </div>
              </div>
              {/* <div className="icon-box">
                <FaEllipsisV className="text-muted" />
              </div> */}
            </div>
            <div className="mt-4">
              <p className="text-sm">Job Role</p>
              <h1 className="text-lg font-bold">{job.title}</h1>
            </div>
            <div className="mt-5">
            <p className="text-sm mb-2">Skills</p>
              {/* Job Skills */}
              <div className="flex max-w-xs flex-wrap mb-auto flex-shrink-0 ">
                {job.skills.slice(0,5).map((skill, index) => (
                  <span key={index} className="bg-white border border-gray-400 text-blue_color rounded-full px-3 py-1 text-sm mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* <div className="mt-4 flex-center-between">
              <button className="btn border">accept</button>
              <button className="btn border dark:border-hover-color">
                reject
              </button>
            </div> */}
          </div>
        ))}
      </div>

      ):(
        <div className="flex-center-center mt-5">
              <div className="image-wrapper">
                {/* <img
                  src="/404.png"
                  alt="404"
                  className="mx-auto  object-contain h-[350px] w-[350px]"
                /> */}
                <h1 className="text-center text-black_color mt-5 text-3xl opacity-70">
                  No job offers yet
                </h1>
              </div>
            </div>
      
      )}

      
    </div>
  );
};

export default Offers;
