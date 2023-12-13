"use client"
import React, { useEffect, useState , useRef} from 'react';
import { useRouter } from 'next/navigation';
import { BiFile, BiLink } from "react-icons/bi";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { toast } from 'react-hot-toast';

import { useUiContext } from "../../../../contexts/UiContext";

const ApplyJob = ({ params }) => {
  const router = useRouter();
  const [jobData, setJobData] = useState(null);
  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [fileURL, setfileURL] = useState("");

  // const { user, token } = useUiContext();
  // console.log("user:" , user)
  // console.log("token:" , token)

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

  const isFileValid = (file) => {
    const allowedExtensions = ['.pdf', '.docx'];
    const extension = file.name.toLowerCase().slice((file.name.lastIndexOf('.') + 1));
  
    if (allowedExtensions.includes(`.${extension}`)) {
      return true;
    } else {
      toast.error('Please upload a valid PDF or DOCX file.');
      return false;
    }
  };
  

  const handleSubmit = async () => {
    if (file) {
      if (isFileValid(file)) {
        try {
          // Upload file to Firebase
          await uploadFileToFirebase();
  
          // Introduce a delay of 3000 milliseconds (3 seconds) before calling applyJob
          setTimeout(() => {
            applyJob();
          }, 2000);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    } else {
      toast.error('Please select a file');
      console.log('error');
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
  
      console.log(result);
  
      if (result.success) {
        // Update fileURL state
        setfileURL(result.url);
      } else {
        // Handle the case where the upload was not successful
        console.error('File upload failed:', result.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Propagate the error to the caller
    }
  };
  
  const applyJob=()=>{
    var myHeaders2 = new Headers();
myHeaders2.append("Content-Type", "application/json");
myHeaders2.append("Cookie", `token=${getCookie("token")}`);

var raw1 = JSON.stringify({
  "resumeFile": fileURL,
  "candidateId": getCookie("candidate")._id
});
console.log(raw1)

var requestOptions = {
  method: 'POST',
  headers: myHeaders2,
  body: raw1,
  redirect: 'follow'
};

fetch(`http://localhost:3000/api/v1/candidate/applyjob/${params.id}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if(result.success){
      console.log('Form submitted successfully!');
      toast.success(result.message)
      router.push('/')
      }
      else{
        console.log("coooookkkkkkkkkkkieieiiiieeeeeeeeeee")
        console.log(getCookie("token"))
        toast.error(result.message)
      }
  })
  .catch(error => console.log('error', error));
  }

  return (
    <div className=" font-poppins rounded max-w-3xl w-full mx-auto">
        {/*---------------------------------------- Back to home button------------------------------------- */}
        <button className="btn flex bg-teal_color hover:bg-opacity-70 text-white">
          <Link href="/" legacyBehavior>
            <a className="flex-align-center flex gap-1 items-center ">
              <FiChevronLeft />
              <span>back</span>
            </a>
          </Link>
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
            <div className=" ">
              <p className='font-medium'>Job Description</p>
              <div className="flex gap-2 items-center justify-center mt-2 mb-2">
                <a
                  href={jobData?.descriptionFile}  // Provide the correct URL to the description file
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn flex items-center text-black_color gap-2 hover:bg-teal_color hover:text-white"
                >
                  <BiLink />
                  <span>View Job Description File</span>
                </a>
                {/* You can also add a button to download the file if needed */}
                <button
                  className="btn text-black_color flex items-center gap-2  hover:bg-teal_color hover:text-white"
                  onClick={() => window.open(jobData?.descriptionFile, '_blank')}
                >
                  <BiFile />
                  <span>Download Job Description File</span>
                </button> 
              </div>
            </div>
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
              <p className='font-medium'>Resume/CV*</p>
              <button
                className="btn mt-2 flex items-center  text-gray-300 gap-2 bg-dark-card hover:bg-hover-color"
                onClick={() => fileInput.current.click()}
              >
                <BiLink />
                <span>Attach Resume/CV</span>
              </button>
            </div>
          </div>
          {file && (
            <div className="flex-align-center gap-2 text-primary">
              <BiFile />{" "}
              <p>
                {file.name.length > 20
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
  );
};

export default ApplyJob;
