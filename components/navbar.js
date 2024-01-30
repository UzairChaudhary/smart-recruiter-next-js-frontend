/* eslint-disable @next/next/no-img-element */
"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiDelete} from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';
import { links } from "../data/links";
import Dropdown from "./Dropdown";
import LoginSignupScreen from './LoginSignupScreen';
import { getCookie, setCookie } from "cookies-next";
import ActiveLink from '../components/ActiveLink'
const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginScreenOpen, setLoginScreenOpen] = useState(false);


  useEffect(() => {
    // Check for the "session" cookie and update the state accordingly
    setLoggedIn(getCookie("session") === "login");
  }, []);

  useEffect(() => {
    
    //console.log("login as: ", getCookie("user"));
    if(getCookie("user")===undefined){
      setCookie("user", "candidate")
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const { dispatch, isSidebarOpen, isUserLoggedIn, isLoginSidebarOpen } = useUiContext();
  

  const handleDropdown = () => {
    dispatch({ type: actioTypes.toggleDropdown });
  };


  const handleLoginClick = () => {
    setLoginScreenOpen(true);
    dispatch({ type: actioTypes.openLoginSidebar })
    
  };

  const handleLoginScreenClose = () => {
    setLoginScreenOpen(false);
    dispatch({ type: actioTypes.closeLoginSidebar })
    
  };

  

  

  return (
    <nav suppressHydrationWarning={true} className="bg-white py-2 pt-4 flex justify-around items-center space-x-60 ">
      {/* Logo on the left */}
      
        <Link href="/" suppressHydrationWarning={true}>
          <Image  src="/CareerAi-logo.png" height={130} width={130} alt="Smart Recruiter" />
         
        </Link>
      

      
      {isMobile ? (
        // Hamburger menu for mobile view
        <div>
          <button onClick={() => dispatch({ type: actioTypes.toggleSidebar })} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {isSidebarOpen && (
            <div >
              <ul className={`bg-slate-50 mobile-dialog absolute h-screen flex flex-col space-y-4 p-3 dark:bg-dark-card transition-a top-0 left-0 !rounded-xl z-30 ${
              isSidebarOpen && "open"
            }`}  >
            <div className="flex justify-between border-b dark:border-slate-800 space-x-40 p-1 ">
            <p className="uppercase">menu</p>
            <div
              className="icon-box cursor-pointer"
              onClick={() => dispatch({ type: actioTypes.closeSidebar })}
            >
              <FiDelete />
            </div>
          </div>
          {links.map(({ id, linkText, url }) => (
            <Link key={id} href={url} end legacyBehavior >
              <a onClick={() => dispatch({ type: actioTypes.closeSidebar })} className="hover:bg-gray-500 hover:text-white rounded-lg p-1 px-2">
                {linkText}
              </a>
            </Link>
          ))}
                
              </ul>
            </div>
            
          )}
        </div>
      ) : (
        // Navigation links for non-mobile view
        <div className="navbar flex items-center space-x-6">
          <ul className="hidden md:flex-align-center space-x-3 lg:space-x-6">
              {links.map(({ id, linkText, url }) => (
                <ActiveLink href={url} key={id}>
                  {linkText}
                </ActiveLink>
              ))}
          </ul>
          

          {loggedIn ? (
            <div 
              className="dropdown-btn flex flex-align-center space-x-1  md:pl-4 flex-shrink-0 relative"
              onClick={handleDropdown}
            >
              <motion.img
                src="/default-dp.png"
                alt="dp"
                className="w-10 h-10 rounded-full sm:cursor-pointer dropdown-btn"
                whileTap={{ scale: 0.5 }}
              ></motion.img>
              <BiChevronDown className="dropdown-btn mt-2 w-5 h-5" />
              <Dropdown />
            </div>
          
          ) : (
            <div>
              <button className="bg-teal_color text-white py-2 px-4 rounded-md" onClick={handleLoginClick}>
              Login
            </button>
            {/* Render LoginSignupScreen when isLoginScreenOpen is true */}

            {isLoginScreenOpen && (
              <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
                
              ></div>
            )}
            {isLoginScreenOpen && <LoginSignupScreen onClose={handleLoginScreenClose} />}
            
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
