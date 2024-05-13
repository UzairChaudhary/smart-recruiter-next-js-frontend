"use client"
import React, {useRef, useState, useEffect, useCallback} from 'react'

import Webcam from "react-webcam";

import { motion } from "framer-motion";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaArrowRight } from "react-icons/fa6";

import Loader from '../../../../loaders/Loader';
import ProgressLoader from '../../../../loaders/progressLoader';

import { useSpeechSynthesis } from 'react-speech-kit';

import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

import { useCheetah } from "@picovoice/cheetah-react";

export default function page({params}) {
    const [loading, setLoading] = useState(true);

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const [seconds, setSeconds] = useState(60);
    const [timer, setTimer] = useState(null)
    const [videoEnded, setVideoEnded] = useState(false);
    const [recordingPermission, setRecordingPermission] = useState(true);
    const [cameraLoaded, setCameraLoaded] = useState(false);
    const vidRef = useRef(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState("Processing");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);
    const [completed, setCompleted] = useState(false);
    
    const [generatedFeedback, setGeneratedFeedback] = useState("");

    const [interviewQuestions, setinterviewQuestions] = useState([]);
    const [videoQuestionURLs, setvideoQuestionURLs] = useState([]);

    const [initialIndex, setinitialIndex] = useState(Number)

    const [nextButton, setNextButton] = useState("start")
    const [isLoading, setisLoading] = useState(true)

    const { speak, speaking } = useSpeechSynthesis();

    const [videoSubmitted, setvideoSubmitted] = useState(false);

    const router = useRouter();

    const [transcript, setTranscript] = useState("");
    const [userResponses, setuserResponses] = useState([]);
  
    const {
      result,
      isLoaded,
      isListening,
      error,
      init,
      start,
      stop,
    } = useCheetah();
  
  
    const initEngine = async () => {
      await init(
        "7FUtbR0d6d/EtnCvRTNKQwPax2bBqpL8DcNtObOCIrzEpXm+qzzmCg==",
        { publicPath: "/cheetah_params.pv" },
        { enableAutomaticPunctuation: true }
      );
    };
  
  
    const toggleRecord = async () => {
      if (isListening) {
        await stop();
      } else {
        await start();
      }
    };
  
    useEffect(() => {
    initEngine()
    }, [])

    useEffect(() => {
      if (result !== null) {
        setTranscript(prev => {
          let newTranscript = prev + result.transcript
          if (result.isComplete) {
            newTranscript += " "
          }
          return newTranscript
        })
      }
    }, [result])

    

    useEffect(() => {
    
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/getJobById/${params.id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.success){
                
                //setvideoQuestionURLs(result.videoURLs)
                setinterviewQuestions(result.job.interviewQuestions)
                setvideoQuestionURLs(["https://firebasestorage.googleapis.com/v0/b/resumeanalyzer-394112.appspot.com/o/JobDescription%2FInterview.mp4?alt=media&token=e2c14f03-76e5-4039-bb5d-6216e3e82f36"])
                console.log(result.job)
                setisLoading(false)
                
            }
        })
          .catch(error => console.log('error', error));
    }, [])
    


    useEffect(() => {
        setIsDesktop(window.innerWidth >= 768);
      }, []);
    
      useEffect(() => {
        if (videoEnded) {
          const element = document.getElementById("startTimer");
    
          if (element) {
            element.style.display = "flex";
          }
    
          setCapturing(true);
          setIsVisible(false);
    
          mediaRecorderRef.current = new MediaRecorder(
            webcamRef?.current?.stream
          );
          mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
          );
          mediaRecorderRef.current.start();
        }
      }, [videoEnded, webcamRef, setCapturing, mediaRecorderRef]);
    
      const handleStartCaptureClick = useCallback(() => {
        setisLoading(false)
        const startTimer = document.getElementById("startTimer");
        setinitialIndex(0)
        
        
        
        
        
        if (startTimer) {
          startTimer.style.display = "none";
          setNextButton("Next")
        }
    
        if (vidRef.current) {
          vidRef.current.play();
        }
        setCapturing(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true }) // Adjust audio if needed
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) =>
          setRecordedChunks([...recordedChunks, e.data]);
        mediaRecorderRef.current.start();
      });
      }, [webcamRef, setCapturing, mediaRecorderRef]);
    
      const handleDataAvailable = useCallback(
        ({ data }) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );
    
      const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        }
        setCapturing(false);
        setCompleted(true)
        
        
        
      }, [mediaRecorderRef, webcamRef, setCapturing]);

      useEffect(() => {
        if (recordedChunks.length && !capturing && completed &&userResponses) {
          //console.log("Speech to text array...")
          console.log(userResponses)
          handleUpload()
        }
        else{
          //console.log("Recording...")
        }
      }, [recordedChunks,capturing,completed, userResponses])

      // useEffect(() => {
      //   if (userResponses.length===5) {
      //     console.log("User Responses...")
      //     console.log(userResponses)
      //     handleUpload()
      //   }
      // }, [userResponses])
    

      useEffect(() => {
        let intervalId;
      
        if (capturing) {
          intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
              const newSeconds = prevSeconds - 1;
              if (newSeconds === 0) {
                if (nextButton === "Next") {
                  handleNextButton(); // Automatically call handleNextButton when timer reaches 0
                } else {
                  handleStopCaptureClick();
                }
              }
              return newSeconds;
            });
          }, 1000);
        } else {
          clearInterval(intervalId); // Clear interval when not capturing
        }
      
        return () => clearInterval(intervalId);
      }, [capturing, initialIndex]);
      
      

    
      const handleDownloadVideo = async () => {
        if (recordedChunks.length) {
          setSubmitting(true);
          setStatus("Processing");
    
          const file = new Blob(recordedChunks, {
            type: `video/webm`,
          });
    
          const unique_id = uuid();
    
          // This checks if ffmpeg is loaded
          if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
          }
    
          // This writes the file to memory, removes the video, and converts the audio to mp3
          ffmpeg.FS("writeFile", `${unique_id}.webm`, await fetchFile(file));
          await ffmpeg.run(
            "-i",
            `${unique_id}.webm`,
            "-vn",
            "-acodec",
            "libmp3lame",
            "-ac",
            "1",
            "-ar",
            "16000",
            "-f",
            "mp3",
            `${unique_id}.mp3`
          );
    
          // This reads the converted file from the file system
          const fileData = ffmpeg.FS("readFile", `${unique_id}.mp3`);
          // This creates a new file from the raw data
          const output = new File([fileData.buffer], `${unique_id}.mp3`, {
            type: "audio/mp3",
          });
    
          const formData = new FormData();
          formData.append("file", output, `${unique_id}.mp3`);
          formData.append("model", "whisper-1");
    
          const question =
            selected.name === "Behavioral"
              ? `Tell me about yourself. Why don${`’`}t you walk me through your resume?`
              : selectedInterviewer.name === "John"
              ? "What is a Hash Table, and what is the average case and worst case time for each of its operations?"
              : selectedInterviewer.name === "Richard"
              ? "Uber is looking to expand its product line. Talk me through how you would approach this problem."
              : "You have a 3-gallon jug and 5-gallon jug, how do you measure out exactly 4 gallons?";
    
          setStatus("Transcribing");
    
          const upload = await fetch(
            `/api/transcribe?question=${encodeURIComponent(question)}`,
            {
              method: "POST",
              body: formData,
            }
          );
          const results = await upload.json();
    
          if (upload.ok) {
            setIsSuccess(true);
            setSubmitting(false);
    
            if (results.error) {
              setTranscript(results.error);
            } else {
              setTranscript(results.transcript);
            }
    
            console.log("Uploaded successfully!");
    
            await Promise.allSettled([
              new Promise((resolve) => setTimeout(resolve, 800)),
            ]).then(() => {
              setCompleted(true);
              console.log("Success!");
            });
    
            if (results.transcript.length > 0) {
              const prompt = `Please give feedback on the following interview question: ${question} given the following transcript: ${
                results.transcript
              }. ${
                selected.name === "Behavioral"
                  ? "Please also give feedback on the candidate's communication skills. Make sure their response is structured (perhaps using the STAR or PAR frameworks)."
                  : "Please also give feedback on the candidate's communication skills. Make sure they accurately explain their thoughts in a coherent way. Make sure they stay on topic and relevant to the question."
              } \n\n\ Feedback on the candidate's response:`;
    
              setGeneratedFeedback("");
              const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  prompt,
                }),
              });
    
              if (!response.ok) {
                throw new Error(response.statusText);
              }
    
              // This data is a ReadableStream
              const data = response.body;
              if (!data) {
                return;
              }
    
              const reader = data.getReader();
              const decoder = new TextDecoder();
              let done = false;
    
              while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                setGeneratedFeedback((prev) => prev + chunkValue);
              }
            }
          } else {
            console.error("Upload failed.");
          }
    
          setTimeout(function () {
            setRecordedChunks([]);
          }, 1500);
        }
      };
    
      function restartVideo() {
        setRecordedChunks([]);
        setVideoEnded(false);
        setCapturing(false);
        setIsVisible(true);
        setSeconds(150);
      }
    
      const videoConstraints = isDesktop
        ? { width: 1280, height: 720, facingMode: "user" }
        : { width: 480, height: 640, facingMode: "user" };
    
      const handleUserMedia = () => {
          setLoading(false);
          setCameraLoaded(true);
        // setTimeout(() => {
        // }, 1000);
      };
      
      const handleNextButton = () => {
          //e.preventDefault();
          
          setinitialIndex(initialIndex + 1)
          if(interviewQuestions.length - 2 === initialIndex){
            
            setNextButton("EndInterview")
            //console.log("last question")
          }
          if (vidRef.current) {
            
            vidRef.current.play();
          }
          setSeconds(60); // Reset timer to 60 seconds on next question
          
          
      }
      useEffect(() => {
        // Update video source based on initialIndex and videoQuestionURLs
        console.log("speaking: ", speaking)
        if (vidRef.current  && initialIndex>0) {
          //vidRef.current.src = videoQuestionURLs[0];
          //vidRef.current.load(); // Reload the video source
          vidRef.current.play(); // Play the video
        
          speak({text:interviewQuestions[initialIndex]})
          console.log("Speaking: ",speaking)
        }
      }, [initialIndex, isLoading]);

      useEffect(() => {
        // Update video source based on speech
        console.log("speaking: ", speaking)
        if (vidRef.current && !speaking) {
          vidRef.current.pause()
          vidRef.current.load()
          //console.log("Startinggggg")
          start()
          
        }
        else{
          stop()
          //console.log("Stopingggggg")
          console.log(transcript)
          setuserResponses(prevResponses => [...prevResponses, transcript]);

        }

       
        
      
      }, [speaking])
    


      const handleUpload = async () => {
        
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, { type: "video/webm" });
          const formData = new FormData();
          formData.append("file", blob,"recorded_video.webm");
          // Append userResponses array to the formData
          formData.append("userResponses", JSON.stringify(userResponses));
      
          const requestOptions = {
            method: "POST",
            body: formData,
            headers: {
              "Cookie": `token=${getCookie('token')}`
              // Add any other headers if required
            },
            credentials:'include',
            redirect: 'follow'
          };
      
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/videoAnalysis/${params.id}`, requestOptions);
            const data = await response.json();
            console.log(data); // handle response from the server
            if(data.success){
              //toast.success(data.message)
              setvideoSubmitted(true)
              router.push("/myjobs");
            }
            else{
              toast.error(data.message)
            }
            toast.success("Your interview is completed successfully")
          } catch (error) {
            console.error("Error:", error);
          }
        }
        else{
          toast.error("Please record your interview")
          setCapturing(true);
          setCompleted(false)

        }
      };

  return (
    <div>
      
      
       <div className="w-full min-h-screen flex flex-col px-4 pt-2 pb-8 md:px-8 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
          
          {completed ? (
             <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
             {videoSubmitted ? (
               //If video is submitted successfully
             <motion.div
                   initial={{ y: 20 }}
                   animate={{ y: 0 }}
                   transition={{
                     duration: 0.35,
                     ease: [0.075, 0.82, 0.165, 1],
                   }}
                   className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
                 >
                   <p className="text-white font-medium text-lg text-center max-w-3xl">
                     Thankyou for taking your time out. Best of Luck!
                   </p>
                   <p className="text-white font-medium text-lg text-center max-w-3xl">
                     You will be redirected to Homepage.
                   </p>
                   
                 </motion.div>
             ):(
               <motion.div
                   initial={{ y: 20 }}
                   animate={{ y: 0 }}
                   transition={{
                     duration: 0.35,
                     ease: [0.075, 0.82, 0.165, 1],
                   }}
                   className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
                 >
                   <p className="text-white font-medium text-lg text-center max-w-3xl mb-16">
                     Hang on a moment while we are analyzing your video. Please Do not close this window.
                   </p>
                   
                     <ProgressLoader/>
                 </motion.div>
             )}
           
         </div>
          ) : (
            <div className="h-full w-full items-center flex flex-col mt-5">
              {recordingPermission ? (
                <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
                  {/* These buttons will be activated after video starts. We will show questions then. */}
                  {(nextButton==="Next" || nextButton==="EndInterview") && (
                    <>
                    {isLoading ? (<Loader/>):(
                      <>
                      <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
                    Question: 0{initialIndex+1}
                  </h2>
                  <h2 className="text-2xl font-semibold text-left text-[#1D2B3A] mb-2">
                    {interviewQuestions[initialIndex]}
                  </h2>
                  
                  
                      </>
                    )}
                    </>
                  )}
                  
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.075, 0.82, 0.965, 1],
                    }}
                    className="relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md"
                  >
                    {!cameraLoaded && (
                      <div className="text-white absolute top-1/2 left-1/2 z-20 flex items-center">
                        <svg
                          className="animate-spin h-4 w-4 text-white mx-auto my-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth={3}
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    )}
                    <div className="relative z-10 h-full w-full rounded-lg">
                      <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                          {new Date(seconds * 1000).toISOString().slice(14, 19)}
                        </span>
                      </div>
                      {isVisible && ( // If the video is visible (on screen) we show it
                        <div className="block absolute top-[10px] sm:top-[20px] lg:top-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-square rounded z-20">
                          <div className="h-full w-full aspect-square rounded md:rounded-lg lg:rounded-xl">
                          
                                <video
                                id="question-video"
                                muted
                                controls={false}
                                ref={vidRef}
                                playsInline
                                className="h-full object-cover w-full rounded-md md:rounded-[12px] aspect-square"
                                crossOrigin="anonymous"
                                >
                                <source src="/Demo/JohnTechnical.mp4" type="video/mp4" />
                                </video>
                            
                          </div>
                        </div>
                      )}
                      <Webcam
                        mirrored
                        audio
                        muted
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                        onUserMedia={handleUserMedia}
                        onUserMediaError={(error) => {
                          setRecordingPermission(false);
                        }}
                        className="absolute z-10 min-h-[100%] min-w-[100%] h-auto w-auto object-cover"
                      />
                    </div>
                    {loading && (
                      <div className="absolute flex h-full w-full items-center justify-center">
                        <div className="relative h-[112px] w-[112px] rounded-lg object-cover text-[2rem]">
                          <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[0.5rem] bg-[#4171d8] !text-white">
                            Loading...
                          </div>
                        </div>
                      </div>
                    )}

                    {cameraLoaded && (
                      <div className="absolute bottom-0 left-0 z-50 flex h-[82px] w-full items-center justify-center">
                        {recordedChunks.length > 0 ? (
                          <>
                            {isSuccess && (
                              <button
                                className="cursor-disabled group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold group inline-flex items-center justify-center text-sm text-white duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                                style={{
                                  boxShadow:
                                    "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mx-auto"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5 }}
                                  />
                                </svg>
                              </button>
                            
                            )}
                          </>
                        ) : (
                          <div className="absolute bottom-[6px] md:bottom-5 left-5 right-5">
                            <div className="lg:mt-4 flex flex-col items-center justify-center gap-2">
                              {(nextButton==="start" && !isLoading) && (
                                
                                <button
                                  id="startTimer"
                                  onClick={()=>{handleStartCaptureClick();speak({ text: interviewQuestions[initialIndex]})}}
                                  disabled={isLoading}
                                  className="flex h-8 w-8 sm:h-8 sm:w-8 flex-col items-center justify-center rounded-full bg-red-500 text-white hover:shadow-xl ring-4 ring-white ring-offset-gray-500 ring-offset-2 active:scale-95 scale-100 duration-75"
                                ></button>
                              )}
                                
                                
                                
                                {/*Show next question button after start recording*/}
                                
                              
                              
                            </div>
                            <div className='flex justify-end'>
                                {nextButton==="Next" &&(
                                    <button
                                    id="nextButton" 
                                    onClick={()=>{handleNextButton()}}
                                    className="group mb-5 mr-5 rounded-lg px-4 py-2 text-[16px] transition-all flex items-center justify-end text-white bg-[#1E2B3A] hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                                    >
                                        Next
                                        <FaArrowRight/>
                                    </button>
                                )}
                                {nextButton==="EndInterview" &&(
                                    <button
                                    id="EndInterview" 
                                    onClick={handleStopCaptureClick}
                                    className="group mb-5 mr-5 rounded-lg px-4 py-2 text-[16px] transition-all flex items-center justify-end text-white bg-[#1E2B3A] hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                                    >
                                        End Interview
                                        <FaArrowRight/>
                                    </button>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-5xl text-white font-semibold text-center"
                      id="countdown"
                    ></div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.15,
                      ease: [0.23, 1, 0.82, 1],
                    }}
                    className="flex flex-row space-x-1 mt-4 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-[#407BBF]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                      Video is not stored on our servers, it is solely used for
                      analysis.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.075, 0.82, 0.165, 1],
                    }}
                    className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
                  >
                    <p className="text-white font-medium text-lg text-center max-w-3xl">
                      Camera permission is denied. Your video will be solely used for analysis purposes. It will be deleted as you end the interview. Try again by opening this page
                      in an incognito window {`(`}or enable permissions in your
                      browser settings{`)`}.
                    </p>
                  </motion.div>
                  <div className="flex flex-row space-x-4 mt-8 justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className=" group max-w-[200px] rounded-full px-4 py-2 text-[13px] transition-all flex items-center justify-center text-[#f5f7f9] bg-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                      style={{
                        boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                      }}
                    >
                      Restart Interview
                    </button>
                    
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
    </div>
  )
}
