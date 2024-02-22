"use client"
import React, { useEffect, useState , useRef} from 'react';
import { useRouter } from 'next/navigation';
import { BiFile, BiLink } from "react-icons/bi";
import { FiChevronLeft } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";

import { getCookie } from "cookies-next";
import { toast } from 'react-hot-toast';
import Footer from '../../../../components/Footer';
import ProgressLoader from '../../../../loaders/progressLoader';




const ApplyJob = ({ params }) => {
  const router = useRouter();
  const [viewJobDescription, setViewJobDescription] = useState(false);
  const [jobData, setJobData] = useState(null);
  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [fileURL, setfileURL] = useState(null);
  const [loading, setLoading] = useState(false);

  
  

  const toggleViewJobDescription = () => {
    setViewJobDescription(!viewJobDescription);
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", `token=${getCookie("token")}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        
        const response = await fetch(`http://localhost:3000/api/v1/job/getJobById/${params.id}`, requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }

        const data = await response.json();
        setJobData(data.job);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    
    fetchJobData();
    
    
  }, [params.id]);

  useEffect(() => {
    
    if (fileURL){
      performResumeAnalysis(fileURL)
      
    }
  }, [fileURL]);
  // useEffect(() => {
    
  //   if (analysisScore){
      
  //     applyJob(fileURL)
  //   }
  //   else{
  //     setLoading(false)
      
  //   }
  // }, [analysisScore]);

  const isFileValid = (file) => {
    const allowedExtensions = ['.pdf'];
    const extension = file.name.toLowerCase().slice((file.name.lastIndexOf('.') + 1));
    
    if (allowedExtensions.includes(`.${extension}`)) {
      
      return true;
    } else {
      toast.error('Please upload a valid PDF file only');
      return false;
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true)
    if (file) {
      if (isFileValid(file)) {
        try {
          // Upload file to Firebase
          await uploadFileToFirebase();
  
          
        } catch (error) {
          console.error('Error uploading file:', error);
          setLoading(false)
        }
      }
    } else {
      toast.error('Please select a file');
      console.log('error');
      setLoading(false)
    }
  };
  
  const uploadFileToFirebase = async () => {
    try {
      const formData = new FormData();
      formData.append('filename', file);
  
      const myHeaders = new Headers();
      myHeaders.append('Cookie', `token=${getCookie('token')}`);
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };
  
      const response = await fetch('http://localhost:3000/api/v1/uploadFile', requestOptions);
      const result = await response.json();
  
      
  
      if (result.success) {
        // Update fileURL state
        setfileURL(result.url);
      } else {
        // Handle the case where the upload was not successful
        console.error('File upload failed:', result.message);
        setLoading(false)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
      throw error; // Propagate the error to the caller
    }
  };
  
  const applyJob=(URL,AnalysisScore)=>{
    var myHeaders2 = new Headers();
myHeaders2.append("Content-Type", "application/json");

var raw1 = JSON.stringify({
  "resumeFile": URL,
  "resumeAnalysisScore":AnalysisScore
  
  
});


var requestOptions = {
  method: 'POST',
  headers: myHeaders2,
  credentials: 'include',
  body: raw1,
  redirect: 'follow'
};

fetch(`http://localhost:3000/api/v1/candidate/applyjob/${params.id}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result.success){
      setLoading(false)
      console.log('Form submitted successfully!');
      toast.success(result.message)
      router.back()
      }
      else{
        
        toast.error(result.message)
        setLoading(false)
      }
  })
  .catch(error => console.log('error', error));
  }
  const performResumeAnalysis=async (URL)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "resumeUrl":URL ,
      "jobDescriptionUrl":jobData?.descriptionFile 
    });
   
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/v1/recruiter/resumeAnalysis", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.error) {
          toast.error(result.error)
          setLoading(false)
          return 
        }
        const AnalysisScore = result.similarity_percentage
        applyJob(URL,AnalysisScore)
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <div className='w-full h-full bg-hero-gradient opacity-20 py-20 mb-10'>
      </div>
      <h1 className='text-2xl font-poppins absolute top-32 left-1/4  text-black_color font-bold'>Job Application</h1>
      <h1 className='text-md font-poppins absolute top-40 mt-1 left-1/4  text-black_color '>Home / Apply Job</h1>
      <div className=" font-poppins  rounded max-w-3xl w-full mx-auto">
        {/*---------------------------------------- Back to home button------------------------------------- */}
        <button 
        className="btn flex-align-center flex gap-1 items-center bg-teal_color hover:bg-opacity-70 text-white"
        onClick={()=>router.back()}
        >
              <FiChevronLeft />
              <span>back</span>
        </button>

        <div className="mt-3 items-center flex flex-col">
          <h1 className="text-xl font-semibold">{jobData?.title}</h1>
          <p className="text-sm">
            <span className="text-primary">{jobData?.owner.name}</span>
            
          </p>
        </div>
        <div className="py-4 flex justify-center mt-3 border-y dark:border-hover-color">
          <h1 className="font-bold capitalize">submit your application</h1>
        </div>
        <div className='mt-3 flex items-center'>
        <p className='font-medium'>Job Type: </p>
        <p className=" ml-3 ">{jobData?.jobType}</p>
        </div>
        <div className='mt-3 flex items-center'>
        <p className='font-medium mr-4'>Required Skills: </p>
        {/* <p className=" ml-3 ">{jobData?.skills}</p> */}
        {jobData?.skills && (
            <div className="">
              
              <div className="flex gap-1">
                {jobData.skills.map((skill, index) => (
                  <button
                    key={index}
                    className="btn bg-black_color text-white text-sm"
                    onClick={() => {
                      // Handle skill button click if needed
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='mt-3 flex items-center'>
        <p className='font-medium'>Required Experience: </p>
        {jobData?.experienceLevel ? (
            <p className=" ml-3 ">{jobData?.experienceLevel}</p>
        ):(
          <p className=" ml-3 ">None</p>
        )}
        
        </div>
        <div className="py-4 border-b dark:border-hover-color">
          <div className="">
          {jobData?.descriptionFile && (
            <div className=" flex items-center gap-4 ">
              <p className='font-medium mb-2'>Job Description</p>
              <div className="flex gap-2 items-center justify-center mb-2">
                
                <button
                  className="btn text-black_color flex items-center gap-2  hover:bg-teal_color hover:text-white"
                  onClick={() => {toggleViewJobDescription()}}
                >
                  <BiFile />
                  <span>View Job Description File</span>
                </button> 
                {/* You can also add a button to download the file if needed */}
                <button
                  className="btn text-black_color flex items-center gap-2  hover:bg-teal_color hover:text-white"
                  onClick={() => window.open(jobData?.descriptionFile, '_blank')}
                >
                  <IoMdDownload />
                  <span>Download Job Description File</span>
                </button> 
                


              </div>
            </div>
          )}
          {viewJobDescription && (
            <iframe
            className="w-full h-96"
            src={jobData?.descriptionFile}
            allowFullScreen
            title="Job Description"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"



          ></iframe>
          )}
            

            

            {/*---------------------------------------- File upload------------------------------------- */}
            <div>
              <input
                type="file"
                hidden
                required
                ref={fileInput}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <p className='font-medium mt-2'>Resume/CV*</p>
              <button
                className="btn mt-2 flex items-center  text-gray-300 gap-2 bg-dark-card hover:bg-hover-color"
                onClick={() => fileInput.current.click()}
              >
                <BiLink />
                <span className=''>Attach Resume/CV</span>
              </button>
            </div>
          </div>
          {file && (
            <div className="flex items-center flex-align-center gap-2 text-primary">
              <BiFile />{" "}
              <p>
                {file.name.length > 50
                  ? file.name.split(".")[0].slice(0, 20) +
                    "..." +
                    file.name.split(".")[1]
                  : file.name}
              </p>
            </div>
          )}
        </div>

        {/*---------------------------------------- Form------------------------------------- */}
        
          
          <button className="mt-8 p-2 w-full bg-black_color rounded hover:bg-opacity-90 text-white"
          onClick={handleSubmit} >
            submit application
          </button>
        
      </div>
      {loading && <ProgressLoader />}
      <Footer/>
    </>
  );
};

export default ApplyJob;
