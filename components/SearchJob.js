"use client"
import React ,{ useState, useRef, useEffect } from "react";
import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";
function JobSearchForm() {
  const [searchItem, setsearchItem] = useState('');
  const { dispatch } = useUiContext();
  
  
  const searchContainerRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setsearchItem('');
        dispatch({type:actioTypes.defaultJobs})
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setsearchItem]);
  
  
  return (
    
    <form className="mx-auto max-w-md mt-[-20px] shadow-md rounded-full flex-wrap">
  <div ref={searchContainerRef} className="flex relative justify-between border-none">
    <input
      type="search"
      id="default-search"
      value={searchItem}
      className="flex-grow block w-full p-4 text-sm text-gray-500 rounded-full border-none focus:outline-none"
      placeholder="Search your dream job"
      onChange={(e)=>{
        setsearchItem(e.target.value)
        dispatch({type:actioTypes.searchedJob,payload:{searchedJob:searchItem}})
      }}
      required
    />
    <button
      type="submit"
      onClick={(e)=>{
        e.preventDefault();
        dispatch({type:actioTypes.searchedJob,payload:{searchedJob:searchItem}})
      }}
      className="text-white absolute end-1.5 bottom-1 bg-black_color font-medium rounded-full text-sm px-6 py-3 border-none"
    >
      Search
    </button>
  </div>
</form>

  );
}

export default JobSearchForm;