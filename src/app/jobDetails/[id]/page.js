"use client"
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { FiChevronLeft } from "react-icons/fi"
import { IoMdDownload } from "react-icons/io";
import { RiErrorWarningLine,RiDeleteBin6Line } from "react-icons/ri";
import Footer from "../../../../components/Footer";

import { toast } from 'react-hot-toast';

import SweetAlert from 'react-bootstrap-sweetalert';

import { getCookie } from "cookies-next";
export default function JobDetails  ({params}) {
    const [jobDetails, setJobDetails] = useState();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [user, setuser] = useState("candidate");
    const router = useRouter();

    useEffect(() => {
    
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`http://localhost:3000/api/v1/job/getJobById/${params.id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.success){
    
                //setJobDetails(result.job);
                // Sort applicants based on resumeAnalysisScore in descending order
          const sortedApplicants = result.job.applicants.sort(
            (a, b) =>
              parseFloat(b.resumeAnalysisScore) -
              parseFloat(a.resumeAnalysisScore)
          );
          setJobDetails({ ...result.job, applicants: sortedApplicants });
                
            }
            //console.log(result)
        })
          .catch(error => console.log('error', error));
    }, [])
    useEffect(() => {
      if(getCookie("user")==="recruiter"){
        setuser("recruiter")
      }
      else setuser("candidate")
    },[]);
    

    
    //handle delete job
    const handleDeleteClicked = async () => {
      try {
        // Make an API request to delete the job
        const response = await fetch(`http://localhost:3000/api/v1/job/${params.id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          console.log("Job deleted successfully");
          
          // Redirect to the home page
          router.push('/');
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    };
    

    return(
        <>
        <div className='rounded-2xl ml-auto mr-auto max-w-7xl bg-hero-gradient py-20 pb-28 '>
        </div>
        <button 
        onClick={()=>router.back()}
        className="btn flex-align-center gap-2 text-white bg-black_color hover:bg-opacity-80 absolute top-28 mt-1 left-48 ">
          
            
              <FiChevronLeft />
              <span>back</span>
            
          
        </button>
        <h1 className='text-md font-poppins absolute top-40 mt-1 left-48  text-white'>Home / Job Details</h1>
        <div className="avatar gap-2 font-poppins absolute top-40 mt-12 left-48 flex items-center " suppressHydrationWarning={true}>
 
            <div className="w-28 ">
                <img src={jobDetails?.avatar} className="rounded-full border border-blue_color" />
            </div>
            
           
            <div className="flex flex-col mt-11">
            <span className="text-lg font-bold">{jobDetails?.owner.name}</span>
            <span className="text-sm text-blue_color">{jobDetails?.owner.email}</span>
            </div>
        </div>
        <div suppressHydrationWarning={true} className="flex ml-auto mr-auto max-w-7xl mt-32">
            <div className="flex flex-col w-1/3 gap-4">
                <h1 className="text-lg font-semibold font-poppins ml-5">Job Details</h1>
                <div className="flex flex-col border rounded-2xl shadow-lg p-10 w-full ">
                    <div className="mb-4">
                        <span className=" text-gray-500">Title</span>
                        <div className="border-b-2 mt-2">{jobDetails?.title}</div>
                    </div>
                    <div className="mb-4">
                        <span className="mb-2 text-gray-500">Job Type</span>
                        <div className="border-b-2 mt-2">{jobDetails?.jobType}</div>
                    </div>
                    <div className="mb-4">
                        <span className="mb-2 text-gray-500">Experience </span>
                        <div className="border-b-2 mt-2">{jobDetails?.experienceLevel}</div>
                    </div>
                    <div className="mb-4">
                        <span className="mb-2 text-gray-500">Skills </span>
                        
                        <div className="border-b-2 mt-2">
                          {jobDetails?.skills && (
                              <div className="">
                                
                                <div className="flex gap-1">
                                  {jobDetails?.skills?.map((skill, index) => (
                                    <span
                                      key={index}
                                      className=" text-sm"
                                      
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <span className="mb-2 text-gray-500">Job Description</span>
                        <button
                          className="btn mt-2 flex justify-center items-center gap-3 bg-teal_color text-white w-full"
                          onClick={() => window.open(jobDetails?.descriptionFile, '_blank')}
                        >
                          <IoMdDownload />
                          <span>Download Job Description File</span>
                        </button> 
                    </div>

                </div>
                {user==="recruiter" &&(
                  <div>
                  <h1 className="text-lg font-semibold font-poppins mb-4 mt-5 ml-5">Actions</h1>
                  <div className="flex flex-col border rounded-2xl shadow-lg p-7 w-full ">
                  <div className="mb-4 flex items-center gap-2 hover:cursor-pointer">
                      <RiErrorWarningLine/>
                      <div className="">Stop accepting resume</div>
                  </div>
                  <div className="mb-4 flex items-center gap-2 hover:cursor-pointer"
                  >
                      <RiDeleteBin6Line/>
                      <div className=""onClick={()=>{
                        setConfirmOpen(true)
                      }}>Delete Job</div>
                      {confirmOpen && (

                      <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnStyle={{color: 'white', backgroundColor:"darkred"}}
                        title="Are you sure?"
                        onConfirm={handleDeleteClicked}
                        onCancel={()=> setConfirmOpen(false)}
                        
                      >
                        You will not be able to recover this job!
                      </SweetAlert>
                      )}
                      
                  </div>
                  </div>
              </div>
                )}
            </div>
            {user==="candidate" && (
              <div className="flex flex-col ">
                <h1 className="text-lg font-semibold font-poppins ml-5">Interview Instructions</h1>
                <p>Before we begin, please take a moment to review the instructions for the interview process:</p>
                <ul className="list-disc">
                  <li>Ensure you have a stable internet connection, a working webcam and microphone</li>
                  <li>Maintain eye contact with the camera and speak clearly to convey your thoughts effectively.</li>
                  <li>Avoid interruptions and distractions during the interview session.</li>
                  <li>Stay composed and confident throughout the process to make a positive impression.</li>
                  <li>The interview consists of a series of questions that you will answer one by one.</li>
                  <li>Each question has a time limit for response, which will be displayed on the screen.</li>
                  <li>Click on the "Next" button to proceed to the next question after answering.</li>
                  <li>Click on the "End Interview" button to end the interview</li>
                </ul>
                  <p>When you're ready, click the "Start Interview" button to begin the video interview process</p>
                  <div className="flex justify-center">
                  <Link
                    href={'/interview/' + params.id}
                    className="btn mt-2 items-center bg-black_color text-white"
                  >    
                  Start Interview
                  </Link> 
                  </div>
              </div>
            )}
            {user==="recruiter" &&(
              <div className=" flex flex-col ml-5">
                <div className=" flex gap-28 px-10 ">
                  <h1 className="text-lg font-semibold font-poppins">Applicants <span className="text-gray-500 font-normal ml-1">({jobDetails?.applicants.length})</span></h1>
                  <span className="text-lg font-semibold font-poppins">sort by: <span className="font-normal ml-1 text-blue_color">Resume Analysis</span></span>
                </div>
                
                {jobDetails?.applicants?.length ? (
                  
                    <div className="items-center justify-center gap-4 p-4">
                      {jobDetails?.applicants?.map((applicants, index)=>(
                      <div 
                      key={applicants.applicant._id}
                      className="applicant-card mb-2 flex items-center justify-between py-4 px-12 border rounded-2xl card-shadow cursor-pointer"
                      >
                        <div className="flex items-center gap-4 ">

                      <img src={applicants.applicant.avatar} className="rounded-full w-20"></img>
                      <div>
                        <h1 className="text-xl font-poppins">{applicants.applicant.name}</h1>
                        <h1 className="text-sm text-gray-500  font-poppins">{applicants.applicant.email}</h1>
                        <div className="flex items-center">
                        <h1 className="text-sm text-teal_color">Resume Score: <span className="text-base font-medium">{applicants.resumeAnalysisScore}</span></h1>

                      </div>
                      </div>
                        </div>
                      
                      <div className="flex flex-col items-center">
                        <h1 className="text-lg text-blue_color font-poppins"># <span className="text-3xl font-bold">{index+1}</span></h1>
                        <h1 className="text-xs text-gray-500">Rank</h1>

                      </div>
                      
                      </div>

                    ))}
                    </div>
                  
                ):(
                  <div className="flex justify-center items-center h-96">
                    <h1 className="text-lg font-semibold font-poppins">No Applicants</h1>
                  </div>
        
                )
              }
            </div>
            )}
        </div>
        <Footer/>
        </>
    )
}