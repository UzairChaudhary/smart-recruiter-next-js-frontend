// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="animate-pulse flex flex-col items-center gap-4 fixed z-50 w-2/4 left-1/4 h-full mt-10 ">
      {/* Loader for Hero Section */}
      <div>
        <div className="w-48 h-6 bg-slate-200 rounded-md"></div>
        <div className="w-28 h-4 bg-slate-200 mx-auto mt-3 rounded-md"></div>
      </div>

      {/* Loader for Job Search Form */}
      <div className="h-7 bg-slate-200 w-full rounded-md"></div>
      <div className="h-7 bg-slate-200 w-full rounded-md"></div>
      <div className="h-7 bg-slate-200 w-full rounded-md"></div>
      <div className="h-7 bg-slate-200 w-1/2 rounded-md"></div>

      {/* Loader for Job Section */}
      <div className="job-section ml-6">
        <h2 className="text-4xl font-medium mt-10 mb-4 w-1/4 h-10 bg-slate-200 rounded-md"></h2>
        <div className="bg-white py-4 flex items-center mb-6">
          <div className="flex space-x-4">
            <div className="bg-slate-200 text-white cursor-pointer p-3 rounded-full"></div>
            <div className="bg-slate-200 text-white cursor-pointer p-3 rounded-full"></div>
            <div className="bg-slate-200 text-white cursor-pointer p-3 rounded-full"></div>
          </div>
          <div className="ml-auto hover:underline pr-40 bg-slate-200 text-white cursor-pointer p-3 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Job Card Loader Structure */}
          <div
            className="bg-white p-5 rounded-3xl mb-8 animate-pulse hover:text-white flex flex-col justify-between h-auto border border-r-6 border-gray-300 shadow-md"
          >
            {/* Company Logo Loader */}
            <div className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-slate-200 border"></div>

            {/* Company Name and Title Loader */}
            <div className="flex flex-col mb-5">
              <div className="text-center text-sm mb-2 bg-slate-200 w-1/2 h-6 rounded-md"></div>
              <div className="text-center font-medium text-lg bg-slate-200 w-3/4 h-6 rounded-md"></div>
            </div>

            {/* Job Skills Loader */}
            <div className="flex flex-wrap justify-center mb-auto flex-shrink-0 ">
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
            </div>

            {/* Job Type Loader */}
            <div className="flex flex-wrap justify-center flex-shrink-0 mb-5 mt-5">
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
            </div>

            {/* Employment Type and Apply Button Loader */}
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-slate-200 text-center bg-slate-200 w-3/4 h-4 rounded-md"></div>

              <div className="bg-slate-200 text-slate-200 px-6 py-2 rounded-full hover:bg-white hover:text-black w-1/4 h-8"></div>
            </div>
          </div>
          {/* Repeat the loader structure for other job cards */}
          <div
            className="bg-white p-5 rounded-3xl mb-8 animate-pulse hover:text-white flex flex-col justify-between h-auto border border-r-6 border-gray-300 shadow-md w-4.5"
          >
            {/* Company Logo Loader */}
            <div className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-slate-200 border"></div>

            {/* Company Name and Title Loader */}
            <div className="flex flex-col mb-5">
              <div className="text-center text-sm mb-2 bg-slate-200 w-1/2 h-6 rounded-md"></div>
              <div className="text-center font-medium text-lg bg-slate-200 w-3/4 h-6 rounded-md"></div>
            </div>

            {/* Job Skills Loader */}
            <div className="flex flex-wrap justify-center mb-auto flex-shrink-0 ">
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
            </div>

            {/* Job Type Loader */}
            <div className="flex flex-wrap justify-center flex-shrink-0 mb-5 mt-5">
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
            </div>

            {/* Employment Type and Apply Button Loader */}
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-slate-200 text-center bg-slate-200 w-3/4 h-4 rounded-md"></div>

              <div className="bg-slate-200 text-slate-200 px-6 py-2 rounded-full hover:bg-white hover:text-black w-1/4 h-8"></div>
            </div>
          </div>
          <div
            className="bg-white p-5 rounded-3xl mb-8 animate-pulse hover:text-white flex flex-col justify-between h-auto border border-r-6 border-gray-300 shadow-md"
          >
            {/* Company Logo Loader */}
            <div className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-slate-200 border"></div>

            {/* Company Name and Title Loader */}
            <div className="flex flex-col mb-5">
              <div className="text-center text-sm mb-2 bg-slate-200 w-1/2 h-6 rounded-md "></div>
              <div className="text-center font-medium text-lg bg-slate-200 w-3/4 h-6 rounded-md"></div>
            </div>

            {/* Job Skills Loader */}
            <div className="flex flex-wrap justify-center mb-auto flex-shrink-0 ">
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
            </div>

            {/* Job Type Loader */}
            <div className="flex flex-wrap justify-center flex-shrink-0 mb-5 mt-5">
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
            </div>

            {/* Employment Type and Apply Button Loader */}
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-slate-200 text-center bg-slate-200 w-3/4 h-4 rounded-md"></div>

              <div className="bg-slate-200 text-slate-200 px-6 py-2 rounded-full hover:bg-white hover:text-black w-1/4 h-8"></div>
            </div>
          </div>
          <div
            className="bg-white p-5 rounded-3xl mb-8 animate-pulse hover:text-white flex flex-col justify-between h-auto border border-r-6 border-gray-300 shadow-md"
          >
            {/* Company Logo Loader */}
            <div className="mx-auto rounded-full p-2 mb-3 w-16 h-16 bg-slate-200 border"></div>

            {/* Company Name and Title Loader */}
            <div className="flex flex-col mb-5">
              <div className="text-center text-sm mb-2 bg-slate-200 w-1/2 h-6 rounded-md"></div>
              <div className="text-center font-medium text-lg bg-slate-200 w-3/4 h-6 rounded-md"></div>
            </div>

            {/* Job Skills Loader */}
            <div className="flex flex-wrap justify-center mb-auto flex-shrink-0 ">
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
              <div className="bg-slate-200 border border-gray-400 text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4"></div>
            </div>

            {/* Job Type Loader */}
            <div className="flex flex-wrap justify-center flex-shrink-0 mb-5 mt-5">
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
              <div id="job-type" className="text-slate-200 rounded-full px-3 py-1 text-sm mr-2 mb-2 w-1/4 h-4 bg-slate-200"></div>
            </div>

            {/* Employment Type and Apply Button Loader */}
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-slate-200 text-center bg-slate-200 w-3/4 h-4 rounded-md"></div>

              <div className="bg-slate-200 text-slate-200 px-6 py-2 rounded-full hover:bg-white hover:text-black w-1/4 h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
