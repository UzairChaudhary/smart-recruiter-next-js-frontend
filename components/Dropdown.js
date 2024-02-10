"use client"
import React, { useEffect, useState , useRef} from 'react';
import { BiBriefcase, BiLogOut, BiUser, BiUserCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

import { toast } from "react-hot-toast";

const Dropdown = () => {

  const [apiURL, setapiURL] = useState();

  const {dispatch, isDropdownOpen } = useUiContext();
  const router = useRouter();

  useEffect(() => {
    // Check if apiURL is defined before making the API request
    if (apiURL!==undefined) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch(apiURL, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
  
          if (result.success) {
            deleteCookie("token");
  
            if (hasCookie("recruiter")) {
              deleteCookie("recruiter");
            } else {
              deleteCookie("candidate");
            }
  
            setCookie("user", "candidate");
            setCookie("session", "logout");
  
            router.push("/");
            window.location.reload();
            toast.success("Logged out successfully");
          } else {
            toast.error(result.message);
          }
        })
        .catch(error => console.log('error', error));
    }
  }, [apiURL]);
  

  const handleLogout = () => {

    dispatch({ type: actioTypes.userLoggedOut });

    
    if (hasCookie("recruiter")){
      setapiURL("http://localhost:3000/api/v1/recruiter/logout")
    }
    else{
      setapiURL("http://localhost:3000/api/v1/candidate/logout")
    }
    
    
    
  };

  return (
    <>
      {isDropdownOpen && (
        <motion.div
          className="dropdown absolute right-0 top-full mt-1 p-2 !rounded-xl w-48 DropDownCard card-shadow dark:shadow-none border bg-slate-50 z-30 "
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          suppressHydrationWarning={true}
        >
          <div
          onClick={()=>router.push("/profile")}
          className=" flex flex-align-center space-x-3 p-2  sm:cursor-pointer hover:bg-gray-500 hover:text-white dark:hover:bg-hover-color rounded-lg">
            <BiUserCircle className="text-muted mt-1 h-4 w-4" />
            <span className="text-muted ">My Profile</span>
          </div>
          {getCookie("candidate")&&(

          <div className="flex flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-gray-500 hover:text-white  dark:hover:bg-hover-color rounded-lg">
            <BiBriefcase className="text-muted mt-1 h-4 w-4" />
            <span className="text-muted">My Jobs</span>
          </div>
          )}
          <div className="flex flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-gray-500 hover:text-white  dark:hover:bg-hover-color rounded-lg">
            <BiLogOut className="text-muted mt-1 h-4 w-4" />
            <span className="text-muted" onClick={handleLogout}>Sign out</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Dropdown;
