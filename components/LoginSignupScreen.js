/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

import { FiLock, FiMail} from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine  } from "react-icons/ri";

import { useRouter } from "next/navigation";

import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";

import { toast } from 'react-hot-toast';



const LoginSignupScreen = ({ onClose }) => {

  const [user, setuser] = useState('');
  const [selectedOption, setSelectedOption] = useState('login');
  const [isNameFocused, setisNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setconfirmPasswordFocused] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // ... (other state variables)

  const router = useRouter();
  const { dispatch,  isUserLoggedIn } = useUiContext();

  const handleUserLogin = () => {
    dispatch({ type: actioTypes.userLoggedIn });
  };
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleUserSelection = (option) => {
    setuser(option);
  };
  const checkNameValidation = () =>{
    const nameRegex = /^[a-zA-Z\s]+$/;
    setIsNameValid(nameRegex.test(formName));
    
  }
  const checkEmailValidation = () =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(formEmail));
    
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (user===''){
      toast.error('Please choose your role');
      return ;
    }
    if (formName=='' || formEmail=='' || formPassword == '' || formConfirmPassword == '' ){
      toast.error('Please enter your required information');
      return ;
    }
    
  
    // If any validation fails, return early
    if (!isNameValid) {
      toast.error('Name should not contain any number');
      return ;
    }
    else if (!isEmailValid) {
      toast.error('Enter email in correct format');
      return ;
    }
    else if (!isPasswordValid) {
      toast.error('Password must be atleast 6 characters');
      return ;
    }
    else if (!passwordsMatch) {
      toast.error('Passwords are not matching');
      return ;
    }
    else{
  
    const formData = {
      name: formName,
      email: formEmail,
      password: formPassword,
      
    };

    try {
      // Conditionally choose the API endpoint based on the user type
      const apiUrl = user === 'candidate' ?
        'http://localhost:3000/api/v1/candidate/register' :
        'http://localhost:3000/api/v1/recruiter/register';

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.success===true){
          
          setFormName('')
          setFormEmail('')
          setFormPassword('')
          setFormConfirmPassword('')
          handleOptionClick('login')

          
          toast.success("Account Created Successfully")
        }
        else{
          toast.error("Sign Up Failed")
        }
        
      })
      .catch(error => console.log('error', error));
      
    } catch (error) {
      // Handle general error, e.g., network issue
      console.error('Error:', error.message);
    }
  }
  
};
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (user===''){
      toast.error('Please choose your role');
      return ;
    }
    else if (formEmail=='' || formPassword == '' ){
      toast.error('Please enter your required information');
      return ;
    }
    
  
    // If any validation fails, return early
    
    else if (!isEmailValid) {
      toast.error('Enter email in correct format');
      return ;
    }
    else if (!isPasswordValid) {
      toast.error('Password must be atleast 6 characters');
      return ;
    }
    
    else{
    // Extract user type-specific form data
    const formData = {
      
      email: formEmail,
      password: formPassword,
      
    };

    try {
      // Conditionally choose the API endpoint based on the user type
      const apiUrl = user === 'candidate' ?
        'http://localhost:3000/api/v1/candidate/login' :
        'http://localhost:3000/api/v1/recruiter/login';

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.success===true){
          
          setFormEmail('')
          setFormPassword('')
          handleUserLogin()
          router.push("/");

          if (user==="candidate"){
            dispatch({ type: actioTypes.userIsCandidate });
          }
          else{
            dispatch({ type: actioTypes.userIsRecruiter });
          }
          toast.success("Login Successful")
        }
        else{
          toast.error("Incorrect Credentials")
        }
        
        


        
      })
      .catch(error => console.log('error', error));
      
    } catch (error) {
      // Handle general error, e.g., network issue
      console.error('Error:', error.message);
      
    }
  }
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50' >
      <div className="fixed top-0 right-0 h-screen bg-white z-50 rounded-tl-2xl rounded-bl-2xl shadow-lg p-8 pt-4 ">
        <div className="flex justify-end items-center mb-4">
          
          <button onClick={onClose}>
            <RxCross2 className="text-2xl text-gray-400" />
          </button>
        </div>
        <hr className="border-t border-gray-300 my-3" />
        <div className="flex justify-center space-x-8 mb-5 z-50">
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
              <div style={{width:"310px"}} className={`mb-4 flex items-center ml-5 border ${isEmailFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isEmailValid ? 'border-red-500' : ''} `}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="email"
                value={formEmail}
                id="email"
                placeholder="Enter your Email"
                className="w-full outline-none focus:outline-none placeholder-gray-400 "
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {setIsEmailFocused(false); checkEmailValidation()}}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              </div>
              <div style={{width:"310px"}}  className={`mb-4 ml-5 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isPasswordValid ? 'border-red-500' : ''}`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="password"
                value={formPassword}
                id="password"
                placeholder="Enter your Password"
                className="w-full outline-none focus:outline-none placeholder-gray-400"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {setIsPasswordFocused(false);setIsPasswordValid(formPassword.length >= 6);}}
                onChange={(e) => {setFormPassword(e.target.value);setIsPasswordValid(formPassword.length >= 6);}}
              />
              </div>
              <div className='flex justify-end mb-6'>
              <a href="#" className="text-sm text-teal_color">
                Forgot password?
              </a>

              </div>
              <div style={{width:"210px"}}  className='flex justify-center ml-14'>
                <button
                  type="submit"
                  className="w-auto bg-black_color text-white p-3 px-7 rounded-full mb-3 text-sm"
                  onClick={(e) => handleLogin(e)}
                  >
                  Log into your account
                </button>
              </div>
              <div style={{width:"210px"}} className={`mb-4 flex items-center w-60 justify-start space-x-2 ml-14 border px-1 py-1 pr-2 rounded-full focus-within:border-teal_color`}>
              <div className='flex justify-start bg-gray-100 rounded-full p-1 '>
              <FcGoogle className="w-7 h-7" />
              </div>
              <button type="text" className='text-teal_color text-sm w-full'> Continue with Google</button>
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
            <div style={{width:"310px"}} className={`mb-2 flex items-center ml-5 border ${isNameFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color 
                ${!isNameValid ? 'border-red-500' : ''} `}>
              <GoPerson className={`mr-2 ${isNameFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                id="name"
                value={formName}
                placeholder= {`Enter your ${ user==="recruiter" ? 'Company Name' : 'Name'}`}
                className={`w-full outline-none focus:outline-none placeholder-gray-400 text-sm 
                `}
                onFocus={() => setisNameFocused(true)}
                onBlur={() => {setisNameFocused(false); checkNameValidation() }}
                onChange={(e) => setFormName(e.target.value)}
              />
              </div>
              <div style={{width:"310px"}} className={`mb-2 flex items-center ml-5 border ${isEmailFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isEmailValid ? 'border-red-500' : ''} `}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="email"
                
                id="email"
                value={formEmail}
                placeholder="Enter your Email"
                className={`w-full outline-none focus:outline-none placeholder-gray-400 text-sm `}                
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {setIsEmailFocused(false); checkEmailValidation()}}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              </div>
              
        
              <div style={{width:"310px"}}  className={`ml-5 mb-2 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isPasswordValid ? 'border-red-500' : ''}`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="password"
                
                id="password"
                value={formPassword}
                placeholder="Enter your password"
                className={`w-full outline-none focus:outline-none placeholder-gray-400 text-sm
                `}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {setIsPasswordFocused(false);setIsPasswordValid(formPassword.length >= 6);}}
                onChange={(e) => {setFormPassword(e.target.value);setIsPasswordValid(formPassword.length >= 6);}}
              />
              </div>
              <div style={{width:"310px"}}  className={`ml-5 mb-4 flex items-center border ${confirmPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!passwordsMatch ? 'border-red-500' : ''}`}>
              <RiLockPasswordLine className={`mr-2 ${confirmPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="password"
                value={formConfirmPassword}
                id="confirm_password"
                placeholder="Confirm Password"
                className={`w-full outline-none focus:outline-none placeholder-gray-400 text-sm `}
                onFocus={() => setconfirmPasswordFocused(true)}
                onBlur={() => {setconfirmPasswordFocused(false);setPasswordsMatch(formPassword === formConfirmPassword);}}
                onChange={(e) => {setFormConfirmPassword(e.target.value);setPasswordsMatch(formPassword === formConfirmPassword);}}
              />
              </div>
              
              <div className='flex justify-center pr-5 ml-8 mt-6'>
                <button
                  type="submit"
                  style={{ width: '210px' }}
                  className="w-60 bg-black_color text-white py-2 rounded-full mb-2"
                  onClick={(e) => handleSignUp(e)}
                  >
                  Create Account
                </button>
              </div>
              
            </form>
            <div style={{width:"210px"}} className={` flex items-center w-60 justify-start space-x-2 ml-16 border px-1 py-1 pr-2 rounded-full focus-within:border-teal_color`}>
              <div className='flex justify-start bg-gray-100 rounded-full p-1 '>
              <FcGoogle className="w-7 h-7" />
              </div>
              <button type="text" className='text-teal_color text-sm w-full'> Continue with Google</button>
              </div>
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
