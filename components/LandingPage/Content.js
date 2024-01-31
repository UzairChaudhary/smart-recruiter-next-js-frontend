import React from 'react'

export default function Content() {
  return (
    <section className=" mt-10 ">
        <div> 
        <div className='items-center'>
                <h3 className='text-4xl text-center mb-20'>How Our System Works?</h3>
                <div className=' flex justify-center items-center mt-10 gap-4'>

                    <div id='card-one' class="card-container">
                        <div class="card">
                            <div class="img-content flex flex-col text-white text-xl gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                                <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
                            </svg>
                           Job Posting

                            </div>
                            <div class="content">
                                <p class="heading">Job Posting</p>
                                <p>
                                Post a job with required skills and experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id='card-two' class="card-container">
                        <div class="card">
                            <div class="img-content flex flex-col text-white text-xl gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                            </svg>

                            Resume Analysis
                            </div>
                            <div class="content">
                                <p className='heading'>Resume Analysis</p>
                                <p>
                                Analyze the resume and extract useful insights
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id='card-three' class="card-container">
                        <div class="card">
                            <div class="img-content  flex flex-col text-white text-xl gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                            </svg>

                            Video Analysis
                            </div>
                            <div class="content">
                                <p class="heading">Video Analysis</p>
                                <p>
                                Analyze candidate interview video and extract useful insights
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id='card-four' class="card-container">
                        <div class="card">
                            <div class="img-content  flex flex-col text-white text-xl gap-2">
                            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13,4V20a1,1,0,0,1-2,0V4a1,1,0,0,1,2,0ZM8,5A1,1,0,0,0,7,6V18a1,1,0,0,0,2,0V6A1,1,0,0,0,8,5ZM4,7A1,1,0,0,0,3,8v8a1,1,0,0,0,2,0V8A1,1,0,0,0,4,7ZM16,5a1,1,0,0,0-1,1V18a1,1,0,0,0,2,0V6A1,1,0,0,0,16,5Zm4,2a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V8A1,1,0,0,0,20,7Z"/></svg>

                            Audio Analysis
                            </div>
                            <div class="content">
                                <p class="heading">Audio Analysis</p>
                                <p>
                                Analyze candidate audio speech and responses and extract useful insights
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-6 items-center ml-52 mr-20 mt-40">
                <div className=" p-2">
                    <img src='resume-analysis.png' className='rounded-2xl shadow-lg' height={1000} width={1000} >
                    </img>
                </div> 
                <div className=" ml-5 "> 
                    <h1 className="text-lg font-semibold mb-5">AI powered Resume Analysis</h1> 
                    <h2 className="text-4xl font-bold mb-5"> Screen, Analyze, and Assess Thousands. Fast. </h2> 
                    <div className=""> 
                        <p>Upload your resume and system will analyze it, extract your qualifications, experiences, and skills and match it with the job description.</p> 
                    </div> 
                </div> 
            </div> 

            <div className="flex justify-between flex-row-reverse gap-6 items-center ml-52 mr-40 mt-20">
                <div className=" p-2">
                    <img src='analysis.png' className='rounded-2xl' height={500} width={500} >
                    </img>
                </div> 
                <div className=" ml-5 max-w-lg "> 
                    <h1 className="text-lg font-semibold mb-5"> Candidate Online Interview Video Analysis </h1> 
                    <h2 className="text-4xl font-bold mb-5"> Elevate Your Job Interviews with AI  </h2> 
                    <div className=""> 
                        <p>Using advanced AI technology, we analyze each video interview, assess their communication skills, body language, and emotional cues. This provides holistic
                           insights into the candidate's performance.
                       </p> 
                    </div> 
                </div> 
            </div> 

            <div className="flex justify-between gap-6 items-center ml-52 mr-40 mt-20">
                <div className=" p-2">
                    <img src='video-analysis.jpg' className='rounded-2xl shadow-lg' height={500} width={500} >
                    </img>
                </div> 
                <div className=" ml-5 max-w-lg"> 
                    <h1 className="text-lg font-semibold mb-5">Unlocking insights: Candidate Audio Speech Analysis</h1> 
                    <h2 className="text-4xl font-bold mb-5">Harness the Power of AI to Analyze Candidate Responses </h2> 
                    <div className=""> 
                        <p>Welcome to our cutting-edge candidate audio speech analysis tool, designed to revolutionize your recruitment process by providing real-time comprehensive insights. 
                        </p> 
                    </div> 
                </div> 
            </div> 

            




        </div> 
    </section>
  )
}