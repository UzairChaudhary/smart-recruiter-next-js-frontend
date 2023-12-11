/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { FiLock, FiMail} from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
const LoginSignupScreen = ({ onClose }) => {

  const [user, setuser] = useState();
  const [selectedOption, setSelectedOption] = useState('login');
  const [isNameFocused, setisNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setconfirmPasswordFocused] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleUserSelection = (option) => {
    setuser(option);
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50'>
      <div className="" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-screen bg-white z-50 rounded-tl-2xl rounded-bl-2xl shadow-lg p-8 pt-4">
        <div className="flex justify-end items-center mb-4">
          
          <button onClick={onClose}>
            <RxCross2 className="text-2xl text-gray-400" />
          </button>
        </div>
        <hr className="border-t border-gray-300 my-3" />
        <div className="flex justify-center space-x-8 mb-6 z-50">
          <button
            onClick={() => handleUserSelection('recruiter')}
            className={`${
              user === 'recruiter' ? 'border-b-2 border-black' : 'bg-white'
            } px-2 py-2 text-black font-medium`}
          >
            Recruiter
          </button>
          <button
            onClick={() => handleUserSelection('candidate')}
            className={`${
              user === 'candidate' ? 'border-b-2 border-black' : 'bg-white'
            } px-2 py-2 text-black font-medium`}
          >
            Candidate
          </button>
          
        </div>

        {selectedOption === 'login' ? (

          <div className="">
            <div>
              
              <div className="text-center">
                <h1 className="text-2xl font-semibold font-poppins mb-3">Login</h1>
                <p className="text-sm text-gray-500">
                  Login to your account
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  to continue
                </p>
              </div>
            </div>
            <form>
              <div style={{width:"350px"}} className={`mb-4 flex items-center border ${isEmailFocused ? 'border-teal_color' : 'border-gray-300'} px-4 py-2 rounded-lg focus-within:border-teal_color w-100`}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-500'}`} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className=" outline-none focus:outline-none"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
              </div>
              <div className={`mb-4 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-300'} px-4 py-2 rounded-lg focus-within:border-teal_color`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-500'}`} />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                className="outline-none focus:outline-none"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              </div>
              <div className='flex justify-end mb-6'>
              <a href="#" className="text-sm text-teal_color">
                Forgot password?
              </a>

              </div>
              <div className='flex justify-center'>
                <button
                  type="submit"
                  className="w-auto bg-black_color text-white px-8 py-2.5 rounded-full mb-3"
                  >
                  Log into your account
                </button>
              </div>
              <div className={`mb-4 flex items-center w-60 justify-start space-x-3 ml-14 border px-1 py-1 rounded-full focus-within:border-teal_color`}>
              <div className='flex justify-start mr-2 bg-gray-100 rounded-full p-1 '>
              <FcGoogle className="w-7 h-7" />
              </div>
              <button type="text" className='text-teal_color text-sm font-medium'> Continue with Google</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="">
            <div>
              
              <div className="text-center">
                <h1 className="text-2xl font-semibold font-poppins mb-2">Sign Up</h1>
                <p className="text-sm text-gray-500 mb-5">
                  Create your new account
                </p>
                
              </div>
            </div>
            <form>
              <div className={`mb-4 flex items-center border ${isNameFocused ? 'border-teal_color' : 'border-gray-300'} px-4 py-2 rounded-lg focus-within:border-teal_color`}>
              <GoPerson className={`mr-2 ${isNameFocused ? 'text-teal_color' : 'text-gray-600 '}`} />
              <input
                type="name"
                name="name"
                id="name"
                placeholder= {`Enter your ${ user==="recruiter" ? 'Company Name' : 'Name'}`}
                className="w-full outline-none focus:outline-none"
                onFocus={() => setisNameFocused(true)}
                onBlur={() => setisNameFocused(false)}
              />
              </div>
              <div className={`mb-4 flex items-center border ${isEmailFocused ? 'border-teal_color' : 'border-gray-300'} px-4 py-2 rounded-lg focus-within:border-teal_color`}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-500'}`} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="w-full outline-none focus:outline-none"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
              </div>
              <div className={`mb-4 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-300'} px-4 py-2 rounded-lg focus-within:border-teal_color`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-500'}`} />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none focus:outline-none"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              </div>
              <div className={`mb-4 flex items-center border ${confirmPasswordFocused ? 'border-teal_color' : 'border-gray-300'} px-4 py-2 rounded-lg focus-within:border-teal_color`}>
              <FiLock className={`mr-2 ${confirmPasswordFocused ? 'text-teal_color' : 'text-gray-500'}`} />
              <input
                type="confirm_password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                className="w-full outline-none focus:outline-none"
                onFocus={() => setconfirmPasswordFocused(true)}
                onBlur={() => setconfirmPasswordFocused(false)}
              />
              </div>
              
              <div className='flex justify-center pr-4'>
                <button
                  type="submit"
                  style={{ width: '210px' }}
                  className="w-60 bg-black_color text-white py-2 rounded-full mb-2"
                  >
                  Create Account
                </button>
              </div>
              <div style={{ width: '210px' }} className={`flex items-center w-60 justify-center ml-16 border p-1 pr-0 rounded-full focus-within:border-teal_color`}>
              <div className='flex justify-start mr-2 bg-gray-100 rounded-full p-1 '>
              <FcGoogle className="w-7 h-7" />
              </div>
              <button type="text"  className='text-teal_color text-sm font-medium'> Continue with Google</button>
              </div>
            </form>
          </div>
          )

        }
        
        
        <div className='absolute bg-hero-gradient right-0 left-0 bottom-0 h-40 rounded-bl-2xl'>
          {selectedOption === 'login' ? (
            <div className='flex flex-col justify-center items-center mt-10 '>
              <p className='text-sm mb-3'>Don't have an account?</p>
              
              <div className='flex justify-center'>
                <button
                  type="submit"
                  className="w-auto bg-black_color text-white px-8 py-2 rounded-full z-30"
                  onClick={() => handleOptionClick('signup')}
                  >
                  Create Account
                </button>
                </div>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center mt-10'>
              <p className='text-sm mb-3'>Already have an account?</p>
              
              <div className='flex justify-center'>
                <button
                  type="submit"
                  className="w-auto bg-black_color text-white px-10 py-2 rounded-full z-30"
                  onClick={() => handleOptionClick('login')}
                  >
                  Login
                </button>
                </div>
            </div>
          )
          }
        </div>

        
        
        

              
    </div>
  </div>

  );
};

export default LoginSignupScreen;
