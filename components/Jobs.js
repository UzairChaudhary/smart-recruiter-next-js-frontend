"use client"
import Image from "next/image";
import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";
import React from 'react';
import Link from 'next/link';

const JobSection = () => {


  const { dispatch,isUserCandidate } = useUiContext();

  const handleUser = () => {
    dispatch({ type: actioTypes.toggleDropdown });
  };



  const categories = [
    'All Categories',
    'Software Developer',
    'Graphic Designer',
    'Marketing',
    'Data Analyst',
    'Accounting',
    'Finance',
    'Sales',
    'Business Development',
    'Human Resources',
    'Customer Service',
    'Engineering',
    'Management',
    'Administrative',
    'Education',
    'Healthcare',
    'Legal',
  ];
  const jobs = [
    
      {
        "id": 1,
        "companyName":"Google",
        "title": "Senior Software Engineer",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi.",
        "type_of_employment": "Full Time",
        "salary_range": "$5000 - $7000",
        "skills": [
          "React",
          "Node",
          "MongoDB",
          "Express",
          "JavaScript",
          "HTML",
          "CSS"
        ],
        "logo_url": "./next.svg"
      },
      {
        "id": 2,
        "title": "Senior Software Engineer",
        "companyName":"Apple",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi.",
        "type_of_employment": "Full Time",
        "salary_range": "$5000 - $7000",
        "skills": [
          "React",
          "Node",
          "MongoDB",
          "Express",
          "JavaScript",
          "HTML",
          "CSS"
        ],
        "logo_url": "./next.svg"
  },
  {
    "id": 3,
    "title": "Senior Software Engineer",
    "companyName":"Figma",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi.",
    "type_of_employment": "Full Time",
    "salary_range": "$5000 - $7000",
    "skills": [
      "React",
      "Node",
      "MongoDB",
      "Express",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "logo_url": "./next.svg"
  },
  {
    "id": 4,
    "title": "Senior Software Engineer",
    "companyName":"Apple",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi.",
    "type_of_employment": "Full Time",
    "salary_range": "$5000 - $7000",
    "skills": [
      "React",
      "Node",
      "MongoDB",
      "Express",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "logo_url": "./next.svg"
},
{
    "id": 5,
    "title": "Senior Software Engineer",
    "companyName":"Google",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi.",
    "type_of_employment": "Full Time",
    "salary_range": "$5000 - $7000",
    "skills": [
      "React",
      "Node",
      "MongoDB",
      "Express",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "logo_url": "./next.svg"
  },
  {
    "id": 6,
    "title": "Senior Software Engineer",
    "companyName":"Google",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi. Sed vitae nibh orci. Ut vitae justo in est vestibulum ultricies. Suspendisse potenti. Nulla facilisi.",
    "type_of_employment": "Full Time",
    "salary_range": "$5000 - $7000",
    "skills": [
      "React",
      "Node",
      "MongoDB",
      "Express",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "logo_url": "./next.svg"
}
  ]


  // Display only the first 4 categories
  const displayedCategories = categories.slice(1, 5);
  // Limit the array to only the first 6 jobs
  const displayedJobs = jobs.slice(0, 8);

  return (
    <div className="job-section ml-6">
      <h2 className="text-4xl font-medium mt-10 flex md:ml-40 mb-4">Popular Jobs</h2>
      <div className="bg-white py-4 flex items-center md:ml-40 mb-6">
        <div className="flex space-x-4">
          {displayedCategories.map((category, index) => (
            <div key={index} className="text-black_color hover:bg-black_color hover:text-white cursor-pointer p-3 rounded-full">
              {category}
            </div>
          ))}
        </div>
        {isUserCandidate && categories.length > 4 ? (
          <div className="ml-auto text-gray-500 hover:underline cursor-pointer pr-40">
            View All
          </div>
        ):(
          <button className="bg-teal_color text-white py-2 px-4 rounded-md ml-auto cursor-pointer pr-5 mr-40">
              <Link href="/login">+ Post Job</Link>
            </button>
        )}
      </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-6 md:ml-40 pr-40 ">
        {displayedJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-3xl mb-8 hover:bg-gradient-to-br hover:from-blue_color hover:to-yellow_color hover:text-white w-auto border border-r-6 border-gray-300">
            {/* Company Logo */}
            <Image src={job.logo_url} alt="Company Logo" className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-white border" height={100} width={100} />

            {/* Company Name */}
            <p className="text-center text-sm mb-4 ">{job.companyName}</p>
            <p className="text-center font-medium text-lg mb-4">{job.title}</p>

            {/* Job Skills */}
            <div className="flex flex-wrap justify-center mb-7 ">
              {job.skills.slice(0, 5).map((skill, index) => (
                <span key={index} className=" bg-white border border-gray-400 text-blue_color rounded-full px-3 py-1 text-sm mr-2 mb-2">
                  {skill}
                </span>
              ))}
            </div>

            {/* Employment Type and Apply Button */}
            <div className="flex justify-between flex-wrap">
              <p className="mt-2">{job.type_of_employment}</p>
              <button className="bg-black_color text-white px-6 py-2 rounded-full hover:bg-white hover:text-black">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSection;
