/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="flex justify-center items-center bg-black_color">
        <div className="flex flex-wrap gap-8 text-white p-20">
          

          <div className="flex-1 basis-[10rem] text-sm">
            <h2 className="text-xl font-semibold mb-10">Company</h2>
            <ul>
              <li className="my-3 text-muted">
                <a href="#"> Blog</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Jobs</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Guides</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Help center</a>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem] text-sm">
            <h2 className="text-xl font-semibold mb-10">Help Links</h2>
            <ul>
              <li className="my-3 text-muted">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Contact</a>
              </li>
              
            </ul>
          </div>

          <div className="flex-1 basis-[10rem] text-sm text-center">
            <h2 className="text-xl font-semibold mb-10 mr-20 pr-5 ml-7">
              Subscribe Us
            </h2>
            <p className="text-muted text-13 mr-10 ml-7">
              Get the lastest jobs updates
            </p>
            <div className="flex flex-col justify-start items-start ">
            <div className="my-3">
              <input
                name=""
                id=""
                type="text"
                className="px-4 py-[0.45rem] card dark:shadow-none outline-none rounded-md mb-4 text-gray-500 w-60 ml-7"
                placeholder="Enter your Email"
              />
              <button className="bg-hero-gradient rounded-2xl px-6 py-2 mr-20">Get Notified</button>
            </div>
            </div>
            
          </div>
        </div>
      </footer>
      <section className=" bg-hero-gradient text-white attribution p-4 pt-6 border-top-light flex justify-around">
        
        <p className="text-center text-lg text-muted pb-2">
          Copyright 2023 | All Rights Reserved
        </p>
        <div className="flex flex-row text-lg">
          <p className="p-1 px-2">Follow Us </p>
          <p className="py-2 px-1"><BiLogoFacebookCircle /></p>
          <p className="py-2"><FaInstagram /></p>
          
          
        </div>
      </section>
    </div>
  );
};

export default Footer;
