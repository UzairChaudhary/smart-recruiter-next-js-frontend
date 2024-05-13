"use client"
import React, { useState, useEffect } from "react";

import { IoMdDownload } from "react-icons/io";
import { BsClipboardCheckFill } from "react-icons/bs";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

import { useUiContext } from "../../../../../contexts/UiContext";
import { actioTypes } from "../../../../../reducers/uiReducer";

import Footer from "../../../../../components/Footer";

import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import Loader from "../../../../../loaders/Loader";

import Navbar from "../../../../../components/navbar"


ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsReport = ({ params }) => {
  // State to store applicant information
  const [applicantData, setApplicantData] = useState(null);
  const [jobDetails, setjobDetails] = useState();

  const [total, settotal] = useState();
  const [responseScore, setresponseScore] = useState();

  const { candidateRank } = useUiContext();

  const router = useRouter();

  const [loading, setloading] = useState(false)



  useEffect(() => {
    // Fetch job details and filter applicant data based on ID
    const fetchJobDetails = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        // Fetch job details using API
        const response = await fetch(`http://localhost:3000/api/v1/job/analysis/${params.id}/${params.applicant}`, requestOptions);
        const result = await response.json();

        // If job details are fetched successfully
        if (result.success) {
          console.log(result)
          // Log the values for debugging
          console.log("Resume Score:", result.ApplicantData.resumeAnalysisScore);
          console.log("Video Score:", result.ApplicantData.videoAnalysisScore);
          console.log("Response Score:", result.ApplicantData.responseAnalysisScore);
        
          // Calculate the total score
          const totalScore = (
            parseFloat(result.ApplicantData.resumeAnalysisScore) +
            parseFloat(result.ApplicantData.videoAnalysisScore) +
            parseFloat(result.ApplicantData.responseAnalysisScore)
          ).toFixed(2);
          const responsesScore = (
           
            parseFloat(result.ApplicantData.responseAnalysisScore)
          ).toFixed(2);
        
          console.log("Total Score:", totalScore); // Log the total score
        
          // Set the applicant data and total score to state
          setApplicantData(result.ApplicantData);
          setjobDetails(result.job);
          settotal(totalScore);
          setresponseScore(responsesScore);
        }
        
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    // Call the fetchJobDetails function
    fetchJobDetails();
  }, []); // Include params.id and params.applicant in the dependency array

  const hireApplicant = () =>{
    setloading(true)
    const myHeaders = new Headers();
myHeaders.append("Cookie", `token=${getCookie('token')}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  credentials:'include',
  redirect: "follow"
};

fetch(`http://localhost:3000/api/v1/job/hire/${params.id}/${params.applicant}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.success) {
      console.log(result.message);
      toast.success(result.message)
      router.push(`/jobDetails/${params.id}`)
      setloading(false)
    }
    else{
      console.log(result.message);
      toast.error(result.message)
      setloading(false)
    }
  })
  .catch((error) => console.error(error));
  }



  return (
    
    
         <div>
          <Navbar />
         {/* Render applicant data */}
         <div className='w-full h-full bg-hero-gradient opacity-20 py-20 pb-32 '>
             </div>
             
             <h1 className='text-2xl font-poppins absolute top-32 left-40  text-black_color font-[600]'>Results</h1>
   
             
             <h1 className='text-md font-poppins absolute top-40 mt-1 left-40  text-black_color'>Home / Applicant / Analysis</h1>
   
         {applicantData && (
           <div className="mt-10 max-w-7xl mx-auto">
           <div className=" p-4 rounded-lg shadow-md mt-10 flex justify-between max-w-7xl mx-auto">
             {/*Applicant Information*/}
             <div className="flex">
               {/*Image*/}
               
               <img src={applicantData.applicant.avatar} alt="Candidate Avatar" className="w-36 h-36 rounded-xl"/>
               
               {/*Information*/}
               <div className="flex  gap-8 items-center p-4">
                 <div className="flex flex-col gap-2">
                   <h1 className="text-xl">Name: </h1>
                   <h1 className="text-xl">Email: </h1>
                   <h1 className="text-xl">Applied For: </h1>
                 </div>
                 <div className="flex flex-col gap-2">
                   <h1 className="text-xl text-gray-500">{applicantData?.applicant?.name} </h1>
                   <h1 className="text-xl text-gray-500">{applicantData?.applicant?.email}  </h1>
                   <h1 className="text-xl text-gray-500">{jobDetails.title} </h1>
                 </div>
                 
               </div>
   
             </div>
             {/* Hire Applicant Option */}
             <div className="flex flex-col justify-center items-center">
                 <button
                   className="btn mt-2 flex justify-center items-center gap-3 bg-teal_color text-white"
                   onClick={() => window.open(applicantData?.resumeFile, '_blank')}
                 >
                   <IoMdDownload />
                   <span>Download Resume</span>
                 </button> 
   
                 <div
                    className="btn mt-4 gap-4 w-full items-center justify-center flex bg-black_color text-white"
                    onClick={()=>hireApplicant()}
                   >  
                    
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                     </svg>
   
                     Send Offer
                 </div> 
   
             </div>
             {/* Render other applicant data as needed */}
             
           </div>
   
           {/* Scoring Results */}
           <div className="flex mt-8 gap-4 px-2 ">
             <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
               <h1 className="text-lg font-medium">Total Score</h1>
               <h1 className="text-3xl font-bold">
  {applicantData ? 
     total
    : "N/A"
  }
</h1>
             </div>
             <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
               <h1 className="text-lg font-medium">Resume Score</h1>
               <h1 className="text-3xl font-bold">{applicantData?.resumeAnalysisScore ? applicantData.resumeAnalysisScore : "N/A"}</h1>
             </div>
             <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
               <h1 className="text-lg font-medium">Video Score</h1>
               <h1 className="text-3xl font-bold">{applicantData?.videoAnalysisScore ? applicantData.videoAnalysisScore : "N/A"}</h1>
             </div>
             <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
               <h1 className="text-lg font-medium">Responses Score</h1>
               <h1 className="text-3xl font-bold">{applicantData ? responseScore : "N/A"}</h1>
             </div>
             <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
               <h1 className="text-lg font-medium">Rank</h1>
               <h1 className="text-3xl font-bold">{candidateRank ? candidateRank : "N/A"}</h1>
             </div>
           </div>
   
           {/* Pie Chart */}
             <div className="mt-10 ">
               {/* <EmotionPieChart  /> */}
               <EmotionPieChart emotionData={applicantData?.videoAnalysis} />
             </div>
   
             <div className="flex mt-12 gap-14  ">
              
               {/*Confidence and Nervousness Score*/}
   
               <div className="flex">
               <div className="flex gap-2 flex-col">
                 <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
                 <h1 className="text-lg font-medium">Confidence State</h1>
                 <h1 className="text-3xl text-black_color font-bold">{applicantData?.videoAnalysis ? applicantData.videoAnalysis.ConfidenceState : "N/A"}</h1>
               </div>
                 <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
                 <h1 className="text-lg font-medium">Nervousness State</h1>
                 <h1 className="text-3xl text-blue_color font-bold">{applicantData?.videoAnalysis ? applicantData.videoAnalysis.NervousnessState : "N/A"}</h1>
               </div>
                 <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
                 <h1 className="text-lg font-medium">Posture</h1>
                 <h1 className="text-3xl text-teal_color font-bold">{applicantData?.videoAnalysis ? applicantData.videoAnalysis.Posture : "N/A"}</h1>
               </div>
               </div>
   
               <ConfidenceDoughnut emotionData={applicantData?.videoAnalysis} />
               </div>
   
                 {/*Text Sentiment Analysis */}
   
               <div className="flex">
               <div className="flex gap-2 flex-col justify-center">
                 <div className="shadow-md flex flex-col justify-center w-60 items-center rounded-md p-6 px-8">
                   <h1 className="text-lg font-medium">Text Sentiment</h1>
                   <h1 className={`text-3xl text-black_color font-bold  ${applicantData?.videoAnalysis?.Sentiment==="Neutral" ? "text-blue_color" : applicantData?.videoAnalysis?.Sentiment==="Positive" ? "text-teal_color":" #D2042D"}`}>{applicantData?.videoAnalysis ? applicantData.videoAnalysis.Sentiment : "N/A"}</h1>
                 </div>
                 
                 
                 
               </div>
   
               <TextSentimentAnalysisDoughnut emotionData={applicantData?.videoAnalysis}/>
               </div>
               
             </div>
             
             <div>
               <h1 className="text-3xl text-center font-bold mt-20 mb-10">Interview Questions Response Analysis</h1>
               
               {jobDetails?.interviewQuestions?.map((question, index) => (
                 <div key={index} className="mt-2 p-2 px-6">
                   <div className="flex p-2 justify-between items-center">
                     <h1 className="text-xl font-bold mr-8">Question 0{index+1}: {question}  </h1>
                     <div className="flex items-center gap-2 text-xl" > 
                     <BsClipboardCheckFill />
                     <p>Evaluation: </p>
                     <span className={`font-bold ${true ? "text-teal_color ":"text-[#D2042D] "}`}>
                     {applicantData.evaluations[index]}
                     </span>
                     <span className="font-bold">/10</span>
                     </div>
                   </div>
   
                   <div className=" shadow-xl p-4  rounded-2xl gap-2">
                     <h1 className="text-xl my-2 font-bold">Candidate Response: </h1>
                     <textarea value={applicantData?.responses[0]} className="text-lg  flex gap-2 w-full">
                     
                     
   
                     </textarea>
                   </div>
   
                 </div>
               ))}
               
             </div>
           
           
           
           
           </div>
         )}
         {loading && <Loader/>}
         <Footer/>
       </div>
      
     
    
  );
};
// const EmotionPieChart = () => {
const EmotionPieChart = ({ emotionData }) => {
  //const emotions = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'];
  const emotionsData = {
    'Happy': emotionData?.Happy, //happy + neutral
    'Neutral': emotionData?.Neutral, //sad
    'Sad':5,
    'Angry': emotionData?.Angry,
    'Disgust': emotionData?.Disgust,
    'Fear': emotionData?.Fear,
    'Surprise': emotionData?.Surprise,
  };
  const emotions = Object.keys(emotionsData);
  const counts = Object.values(emotionsData);

  const data = {
    labels: emotions,
    datasets: [{
      data: counts,
      backgroundColor: [
        '#1ABBAC',
        '#EA5F89',
        '#F7B7A3',
        '#FFF1C9',
        '#0089B5',
        'rgba(54, 162, 235, 0.6)',
        'rgba(0, 0, 0, 0.1)',
        
        
      ],
      
      
    }]
  };

  return <Pie data={data} width={300} height={300} options={{ maintainAspectRatio: false }} />;
};
const ConfidenceDoughnut = ({ emotionData }) => {
    
  const data = {
    labels: [
      'Confidence',
      'Nervousness',
    ],
    datasets: [{
      data: [
        emotionData?.ConfidenceScore,
        emotionData?.NervousnessScore,
      ],
      backgroundColor: [
        '#01042D', 
        '#0089B5',
      ],
      hoverOffset: 4,
      
      
    }]
  };

  return<div className="w-80 h-80 mt-6">
    <Doughnut data={data} width={100} height={100} options={{ maintainAspectRatio: true }} />
  </div> 
    
};
const TextSentimentAnalysisDoughnut = ({ emotionData }) => {
    
  const data = {
    labels: [
      'Neutral',
      'Positive',
      'Negative',
    ],
    datasets: [{
      data: [
        emotionData?.NeutralSentiment,
        emotionData?.PositiveSentiment,
        emotionData?.NegativeSentiment
        
      ],
      backgroundColor: [
        '#0089B5', // neutral blue color 
        '#1ABBAC', // positive teal color
        '#D2042D', //negative red color
      ],
      hoverOffset: 4,
      
      
    }]
  };

  return<div className="w-80 h-80 mt-6">
    <Doughnut data={data} width={100} height={100} options={{ maintainAspectRatio: true }} />
  </div> 
    
};
export default AnalyticsReport;
