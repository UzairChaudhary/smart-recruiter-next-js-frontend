/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useEffect } from 'react'

import Image from "next/image";
import { getCookie } from "cookies-next";

export default function HeroSection() {
  //consoleText(["Smart Recruiter"], "text",["black"]);

// function([string1, string2],target id,[color1,color2])
//consoleText(["Smart Recruiter"], "text", ["white"]);

useEffect(() => {
  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ["black"];
    var visible = true;
    var con = document.getElementById("console");
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    target.setAttribute("style", "color:" + colors[0]);
    window.setInterval(function () {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount);
        window.setTimeout(function () {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute("style", "color:" + colors[0]);
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function () {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 150);
    window.setInterval(function () {
      if (visible === true) {
        con.className = "console-underscore hidden";
        visible = false;
      } else {
        con.className = "console-underscore";
  
        visible = true;
      }
    }, 400);
  }
  if(getCookie("user")==="candidate"){

    consoleText(["Smart Recruiter"], "text", ["black"]);
  }
  else{
    consoleText(["Candidate"], "text", ["black"]);

  }
}, [getCookie("user")])


  return (
    <>
      <div className="relative p-4">
        {getCookie("user")==="candidate" ? (
          <div className="flex flex-col md:flex-row justify-center gap-20 items-center p-5 ml-1 space-x-40 relative z-10 flex-wrap-reverse">
          <div className="animatedLeft flex flex-col justify-center mr-5 mt-5  text-center md:text-left " >
            <div className="mb-2">
              <p className="text-4xl text-black p-1">Let's Get You Recruited</p>
              <p className="text-4xl text-black p-1">In Your Dream Job With</p>
              {/* <p className="text-4xl font-semibold text-black p-1">Smart Recruiter</p> &#95; */}
              <div className='console-container flex items-center text-4xl'>
                <span id='text' className='font-poppins font-semibold'></span>
                <div className='console-underscore' id='console'></div>
              </div>
            </div>
           
            <div>
              <Image alt="Hero" src="/line.png" width={212} height={12} className="mb-8 ml-2"></Image>
            </div>
            <div className="font-">
              <p>Elevate Your Recruitment Game with Smart Recruiter</p>
              <p>Unleashing the Power of AI for Smarter, Data-Driven Decisions.</p>
            </div>
          </div>
          <div className="animatedRight  ">
            <Image alt="Hero" src="/hero-section-img.png" priority={true} width={490} height={437} className="mb-2 p-3 ml-5 "></Image>
          </div>
        </div>
        ):(
          <div className="flex flex-col md:flex-row justify-center items-center p-5 ml-1 space-x-40 relative z-10 flex-wrap-reverse">
          <div className="flex flex-col justify-center mr-5 mt-5 text-center md:text-left md:pl-20">
            <div className="mb-2">
              <p className="text-4xl text-black p-1">Help Companies</p>
              <p className="text-4xl text-black p-1">Find The Right</p>
              {/* <p className="text-4xl font-semibold text-black p-1">Candidate</p> */}
              <div className='console-container flex items-center text-4xl'>
                <span id='text' className='font-poppins font-semibold'></span>
                <div className='console-underscore' id='console'></div>
              </div>
            </div>
            <div>
              <Image alt="Hero" src="/line.png" width={212} height={12} className="mb-8 ml-2"></Image>
            </div>
            <div className="font-">
              <p>Providing Smart Solutions for Smart Companies </p>
              <p>Unleashing the Power of AI for Smarter, Data-Driven Decisions.</p>
            </div>
          </div>
          <div className="flex justify-center md:pr-40">
            <Image alt="Hero" src="/recruiter-hero-section.png" priority={true} width={490} height={437} className="mb-2 p-3 "></Image>
          </div>
        </div>
        )}
        
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="bg-hero-gradient opacity-20 w-full h-full"></div>
        </div>
      </div>
      
    </>
  );
}
