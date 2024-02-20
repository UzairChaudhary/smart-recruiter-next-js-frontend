/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useEffect } from 'react';

import { FiLock, FiMail,FiEye, FiEyeOff} from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine  } from "react-icons/ri";

import { useRouter } from "next/navigation";

import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";

import { toast } from 'react-hot-toast';

import { setCookie } from 'cookies-next';

import { useGoogleLogin } from '@react-oauth/google';
import EnterCode from './forms/VerificationCode';
import Loader from '../loaders/Loader'

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [accessToken, setaccessToken] = useState();
  const [passwordResetEmail, setPasswordResetEmail] = useState();
  const [isLoading, setisLoading] = useState(false);
  // ... (other state variables)

  const router = useRouter();
  const { dispatch } = useUiContext();


  const handleUserLogin = () => {
    dispatch({ type: actioTypes.userLoggedIn });
  };
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleUserSelection = (option) => {
    setuser(option);
  };

  const checkNameValidation = () => {
    // Regular expression to match only numbers (no alphabets)
    const numberRegex = /^\d+$/;
  
    // Use the test method of the regular expression to check if the formName matches the pattern
    setIsNameValid(!numberRegex.test(formName));
  };
  
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
      avatar: "https://firebasestorage.googleapis.com/v0/b/final-year-project-e2eca.appspot.com/o/files%2Fdefault-dp.png?alt=media&token=efcf17aa-c16c-4ac0-9608-48576bc0c677"
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
          toast.error("Sign Up Failed", result)
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
      }).then(response =>response.json())
      .then(result => {
        console.log("result", result)
        
        if (result.success===true){
          
          setFormEmail('')
          setFormPassword('')
          handleUserLogin()
          setCookie("token", result.token)
          setCookie("session", "login")
          
          router.push("/");
          window.location.reload();
          
          
          

          if (result.candidate){
            dispatch({ type: actioTypes.userIsCandidate });
            
            setCookie("user", "candidate")
            setCookie("candidate", result.candidate)
            
            
            dispatch({
              type: 'LOGIN',
              payload:{
                user:result.candidate,
                token:result.token
              }
            })
            
          }
          else{
            dispatch({ type: actioTypes.userIsRecruiter });
            
            setCookie("user", "recruiter")
            setCookie("recruiter", result.recruiter)
            
            
            
            dispatch({
              type: 'LOGIN',
              payload:{
                user:result.recruiter,
                token:result.token
              }
            })
            
          }
          toast.success("Login Successful")
        }
        else{
          
          toast.error(result.message)
        }
        
        


        
      })
      .catch(error => console.log('error', error));
      
    } catch (error) {
      // Handle general error, e.g., network issue
      console.error('Error:', error.message);
      
    }
  }
  };
  const googleLogin =()=>{
    if (user===''){
      toast.error('Please choose your role');
      return ;
    }
    else{
      handleGoogleLogin()
      
    }
  }
  useEffect(() => {
    
    
    if(accessToken){
      const formData = {
      
        googleAccessToken: accessToken,
        
        
      };
  
      try {
        // Conditionally choose the API endpoint based on the user type
        const apiUrl = user === 'candidate' ?
          'http://localhost:3000/api/v1/candidate/continueWithGoogle' :
          'http://localhost:3000/api/v1/recruiter/continueWithGoogle';
  
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then(response =>response.json())
        .then(result => {
          console.log("result", result)
          
          if (result.success===true){
            
            
            handleUserLogin()
            setCookie("token", result.token)
            setCookie("session", "login")
            
            router.push("/");
            window.location.reload();
            
            
            
  
            if (result.candidate){
              dispatch({ type: actioTypes.userIsCandidate });
              
              setCookie("user", "candidate")
              setCookie("candidate", result.candidate)
              
              
              dispatch({
                type: 'LOGIN',
                payload:{
                  user:result.candidate,
                  token:result.token
                }
              })
              
            }
            else{
              dispatch({ type: actioTypes.userIsRecruiter });
              
              setCookie("user", "recruiter")
              setCookie("recruiter", result.recruiter)
              
              
              
              dispatch({
                type: 'LOGIN',
                payload:{
                  user:result.recruiter,
                  token:result.token
                }
              })
              
            }
            toast.success("Login Successful")
          }
          else{
            
            toast.error(result.message)
          }
          
          
  
  
          
        })
        .catch(error => console.log('error', error));
        
      } catch (error) {
        // Handle general error, e.g., network issue
        console.error('Error:', error.message);
        
      }
    }
    
  }, [accessToken])

  const handleGoogleLogin = useGoogleLogin({
    
    onSuccess: async (response) => {
      
      setaccessToken(response.access_token)
      
    
      
    },
    
    onError: error => {console.log(error);return},
    

  });
  
  const handleForgetPassword=(e)=>{
    e.preventDefault()
    setisLoading(true)
    if (user===''){
      toast.error('Please choose your role');
      return ;
    }
    if (formEmail==''){
      toast.error('Please enter your email');
      return ;
    }
    if (!isEmailValid) {
      toast.error('Enter email in correct format');
      return ;
    }
    
      const apiUrl = user === 'candidate' ?
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/candidate/forgetpassword` :
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruiter/forgetpassword`;

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:formEmail}),
      }).then(response =>response.json())
      .then(result => {
        console.log("result", result)
        
        if (result.success===true){
          setisLoading(false)
          toast.success(result.message)
          handleOptionClick('resetpassword')
        }
        else{
          setisLoading(false)
          toast.error(result.message)
        }
        
      })
      .catch(error => console.log('error', error));
    
  }
  
  const handleCodeSubmit = async (code) => {

    try {
      // const payload = new FormData();
      // payload.append("resetPasswordToken", code);
      setisLoading(true)
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "resetPasswordToken": code
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      const apiUrl = user === 'candidate' ?
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/candidate/resetpassword`:
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruiter/resetpassword`;
      fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if(result.success){
          setisLoading(false)
          setPasswordResetEmail(result.email)
          handleOptionClick('setpassword')
          toast.success(result.message)
        }
        else {
          setisLoading(false)
          toast.error(result.message)
        }
        
      })
      .catch((error) => console.error(error));
      
      
    } catch (err) {
      setisLoading(false)
      console.log(`Error: ${err.message}`);
    } 
  }

  const handleResetPassword=(e)=>{
    e.preventDefault()
    // Validation
    if (formPassword === '' || formConfirmPassword === '' ){
      toast.error('Please enter your required information');
      return ;
    }
    
    if (!isPasswordValid) {
      toast.error('Password must be atleast 6 characters');
      return ;
    }
    if (!passwordsMatch) {
      toast.error('Passwords are not matching');
      return ;
    }
    const formData = {
      
      email: passwordResetEmail,
      password: formPassword,
    };
    try{
      setisLoading(true)
      const apiUrl = user === 'candidate' ?
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/candidate/setnewpassword` :
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruiter/setnewpassword`;

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
          setFormConfirmPassword('')
          handleOptionClick('login')

          
          toast.success("Password reset successfully")
        }
        else{
          toast.error("Password reset Failed", result.message)
        }
        
      })
      .catch(error => console.log('error', error));
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-20' >
      <div className="fixed top-0 right-0 h-screen bg-white z-50 rounded-tl-2xl rounded-bl-2xl shadow-lg p-8 pt-4 ">
        <div className="flex justify-end items-center mb-4">
          
          <button onClick={onClose}>
            <RxCross2 className="text-2xl text-gray-400" />
          </button>
        </div>
        <hr className="border-t border-gray-300 my-3" />
        {(selectedOption==='login'||selectedOption==='signup') && (
          <div className="flex justify-center space-x-8 mb-3">
          <button
            onClick={() => handleUserSelection('recruiter')}
            className={`${
              user === 'recruiter' ? 'border-b-2 border-black text-black' : 'bg-white text-gray-400'
            } px-2 py-2 `}
          >
            Recruiter
          </button>
          <button
            onClick={() => handleUserSelection('candidate')}
            className={`${
              user === 'candidate' ? 'border-b-2 border-black text-black' : 'bg-white text-gray-400'
            } px-2 py-2  `}
          >
            Candidate
          </button>
          
        </div>
        )}

        {selectedOption === 'login' && (

          <div className="">
            <div>
              
              <div className="text-center">
                <h1 className="text-2xl font-semibold font-poppins mb-2 text-black">Login</h1>
                <h3 className="text-sm text-gray-500">
                  Login to your account
                </h3>
                <h3 className="text-sm text-gray-500 mb-6">
                  to continue
                </h3>
              </div>
            </div>
            <form>
              <div style={{width:"310px"}} className={`mb-2 flex items-center ml-5 border ${isEmailFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isEmailValid ? 'border-red-500' : ''} `}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="email"
                value={formEmail}
                id="email"
                
                placeholder="Enter your Email"
                className="w-full outline-none focus:outline-none placeholder-gray-400 text-black"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {setIsEmailFocused(false); checkEmailValidation()}}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              </div>
              {!isEmailValid && (
                <div className='flex justify-end mb-2 text-red-500'>
                  <span className='text-xs text-red-500 '>
                Invalid email address format
              </span>
                </div>
              )
              
              }
              <div style={{width:"310px"}}  className={`mb-4 ml-5 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isPasswordValid ? 'border-red-500' : ''}`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              

              <input
                type={isPasswordVisible ? 'text' : 'password'}
                
                id="password"
                value={formPassword}
                placeholder="Enter your password"
                className={`w-full outline-none focus:outline-none placeholder-gray-400 text-black`}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {setIsPasswordFocused(false);setIsPasswordValid(formPassword.length >= 6);}}
                onChange={(e) => {setFormPassword(e.target.value);setIsPasswordValid(formPassword.length >= 6);}}
              />

              {/* Eye button to toggle password visibility */}
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-gray-400 focus:outline-none"
              >
                {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              </div>
              {!isPasswordValid && (
                <div className='flex justify-end mb-2'>
                  <span className='text-xs text-red-500 '>
                Password must be atleast 6 characters
              </span>
                </div>
              )
              
              }
              <div
              onClick={()=> {handleOptionClick("forgetpassword")}} 
              className='flex text-sm text-teal_color hover:cursor-pointer justify-end mb-6'>
                Forgot password?
              
              </div>
              <div style={{width:"210px"}}  className='flex justify-center ml-14 '>
                <button
                  type="submit"
                  className="border w-auto bg-black_color text-white p-3 px-7 rounded-full mb-3 text-sm"
                  onClick={(e) => handleLogin(e)}
                  >
                  Log into your account
                </button>
              </div>
              <div
              onClick={() => {
                googleLogin()
            }}
               style={{width:"210px"}} className={`mb-4 flex hover:cursor-pointer items-center w-60 justify-start space-x-2 ml-14 border px-1 py-1 pr-2 rounded-full focus-within:border-teal_color`}>
              <div className='flex justify-start bg-gray-100 rounded-full p-1 '>
              <FcGoogle className="w-7 h-7" />
              </div>
              <div type="text" className='text-teal_color text-sm w-full'> Continue with Google</div>
              </div>
            </form>
          </div>
        )}
        {selectedOption==="signup" &&  (
          <div className="">
            <div>
              
              <div className="text-center">
                <h1 className="text-2xl font-semibold font-poppins mb-2 text-black">Sign Up</h1>
                <h3 className="text-sm text-gray-500 mb-5">
                  Create your new account
                </h3>
                
              </div>
            </div>
            <form>
            <div style={{width:"310px"}} className={`mb-1 flex items-center ml-5 border ${isNameFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color 
                ${!isNameValid ? 'border-red-500' : ''} `}>
              <GoPerson className={`mr-2 ${isNameFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                id="name"
                
                value={formName}
                placeholder= {`Enter your ${ user==="recruiter" ? 'Company Name' : 'Name'}`}
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-sm 
                `}
                onFocus={() => setisNameFocused(true)}
                onBlur={() => {setisNameFocused(false); checkNameValidation() }}
                onChange={(e) => setFormName(e.target.value)}
              />
              </div>
              {!isNameValid && (
                <div className='flex justify-end mb-1'>
                  <span className='text-xs text-red-500 '>
                Name should not contain numbers only
              </span>
                </div>
              )
              
              }
              <div style={{width:"310px"}} className={`mb-1 flex items-center ml-5 border ${isEmailFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isEmailValid ? 'border-red-500' : ''} `}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="email"
                
                id="email"
                value={formEmail}
                placeholder="Enter your Email"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-sm `}                
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {setIsEmailFocused(false); checkEmailValidation()}}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              </div>
              {!isEmailValid && (
                <div className='flex justify-end mb-1'>
                  <span className='text-xs text-red-500 '>
                Invalid email address format
              </span>
                </div>
              )
              
              }
        
              <div style={{width:"310px"}}  className={`ml-5 mb-1 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isPasswordValid ? 'border-red-500' : ''}`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                
                id="password"
                value={formPassword}
                placeholder="Enter your password"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-sm
                `}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {setIsPasswordFocused(false);setIsPasswordValid(formPassword.length >= 6);}}
                onChange={(e) => {setFormPassword(e.target.value);setIsPasswordValid(formPassword.length >= 6);}}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-gray-400 focus:outline-none"
              >
                {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              </div>
              
              {!isPasswordValid && (
                <div className='flex justify-end mb-1'>
                  <span className='text-xs text-red-500 '>
                Password must be atleast 6 characters
              </span>
                </div>
              )
              
              }
              <div style={{width:"310px"}}  className={`ml-5 mb-1 flex items-center border ${confirmPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!passwordsMatch ? 'border-red-500' : ''}`}>
              <RiLockPasswordLine className={`mr-2 ${confirmPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                value={formConfirmPassword}
                id="confirm_password"
                
                placeholder="Confirm Password"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-sm `}
                onFocus={() => setconfirmPasswordFocused(true)}
                onBlur={() => {setconfirmPasswordFocused(false);setPasswordsMatch(formPassword === formConfirmPassword);}}
                onChange={(e) => {setFormConfirmPassword(e.target.value);setPasswordsMatch(formPassword === formConfirmPassword);}}
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="text-gray-400 focus:outline-none"
              >
                {isConfirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              </div>
              
              {!passwordsMatch && (
                <div className='flex justify-end'>
                  <span className='text-xs text-red-500 '>
                Passwords are not matching
              </span>
                </div>
              )
              
              }
              
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
            <div style={{width:"210px"}}
            onClick={() => {
              googleLogin()
          }}
             className={`hover:cursor-pointer flex items-center w-60 justify-start space-x-2 ml-16 border px-1 py-1 pr-2 rounded-full focus-within:border-teal_color`}>
              <div className='flex justify-start bg-gray-100 rounded-full p-1 '>
              <FcGoogle className="w-7 h-7" />
              </div>
              <div type="text" className='text-teal_color text-sm w-full'> Continue with Google</div>
              </div>
          </div>
          )

        }
        {selectedOption==="forgetpassword" &&(
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl font-semibold font-poppins mb-2 text-black">Forgot Password</h1>
              <h3 className="text-sm text-gray-500 mb-5">
                Enter your email to reset your password
              </h3>
              
            </div>
            <form>
              <div style={{width:"310px"}} className={`mb-1 flex items-center ml-5 border ${isEmailFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isEmailValid ? 'border-red-500' : ''} `}>
              <FiMail className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="email"
                value={formEmail}
                id="email"
                
                placeholder="Enter your Email"
                className="w-full outline-none focus:outline-none placeholder-gray-400 text-black"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {setIsEmailFocused(false); checkEmailValidation()}}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              </div>
              <div style={{width:"210px"}} className='flex justify-center ml-14 mt-3 '>
                <button
                  type="submit"
                  className="border w-auto bg-black_color text-white p-3 px-7 rounded-full mb-3 text-sm"
                  onClick={(e) => handleForgetPassword(e)}
                  >
                  Send Code
                </button>
              </div>
            </form>
          </div>
        
        )}
        {selectedOption==="resetpassword" && (
          <div className="flex mt-5 max-w-xs justify-center flex-col items-center">
            <p className="mb-6 text-base font-medium px-5 text-gray-500">
              Enter the code sent to your email to reset your password
            </p>
            <div className="flex flex-col gap-6">
            <EnterCode callback={handleCodeSubmit} />
          </div>
          </div>
        )}
        {isLoading && <Loader/>}
        {selectedOption==="setpassword" && (
          <div className="flex mt-5 max-w-xs justify-center flex-col items-center">
            <p className="mb-6 text-base font-medium  text-gray-500">
              Set a new password for your account
            </p>
            <div style={{width:"310px"}}  className={`ml-5 mb-1 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isPasswordValid ? 'border-red-500' : ''}`}>
              <FiLock className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                
                id="password"
                value={formPassword}
                placeholder="Enter your password"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-sm
                `}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => {setIsPasswordFocused(false);setIsPasswordValid(formPassword.length >= 6);}}
                onChange={(e) => {setFormPassword(e.target.value);setIsPasswordValid(formPassword.length >= 6);}}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-gray-400 focus:outline-none"
              >
                {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              </div>
              
              {!isPasswordValid && (
                <div className='flex justify-end mb-1 ml-20'>
                  <span className='text-xs text-red-500 '>
                Password must be atleast 6 characters
              </span>
                </div>
              )
              
              }
              <div style={{width:"310px"}}  className={`ml-5 mb-1 flex items-center border ${confirmPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!passwordsMatch ? 'border-red-500' : ''}`}>
              <RiLockPasswordLine className={`mr-2 ${confirmPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                value={formConfirmPassword}
                id="confirm_password"
                
                placeholder="Confirm Password"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-sm `}
                onFocus={() => setconfirmPasswordFocused(true)}
                onBlur={() => {setconfirmPasswordFocused(false);setPasswordsMatch(formPassword === formConfirmPassword);}}
                onChange={(e) => {setFormConfirmPassword(e.target.value);setPasswordsMatch(formPassword === formConfirmPassword);}}
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="text-gray-400 focus:outline-none"
              >
                {isConfirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
              </div>
              
              {!passwordsMatch && (
                <div className='flex justify-end ml-36'>
                  <span className='text-xs text-red-500 '>
                Passwords are not matching
              </span>
                </div>
                
              )
              
              }
              <div style={{width:"210px"}} className='flex justify-center ml-2 mt-3 '>
                <button
                  type="submit"
                  className="border w-auto bg-black_color text-white p-3 px-7 rounded-full mb-3 text-sm"
                  onClick={(e) => handleResetPassword(e)}
                  >
                  Reset Password
                </button>
              </div>
          </div>
        )}
            
            
        
        
        <div className='absolute bg-hero-gradient right-0 left-0 bottom-0 h-40 rounded-bl-2xl'>
          {(selectedOption === 'login' || selectedOption === 'forgetpassword') && (
            <div className='flex flex-col justify-center items-center mt-10 '>
              <span className='text-sm mb-3 text-black'>Don't have an account?</span>
              
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
          )} 
         
          {selectedOption==="signup" && (
            <div className='flex flex-col justify-center items-center mt-10'>
              <span className='text-sm mb-3 text-black'>Already have an account?</span>
              
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
          {selectedOption==='setpassword'&&(
            <div className='bg-[#01042D] h-full w-full flex justify-center items-center'>

              <img src='/logos/CareerAi.png' height={150} width={150} alt='logo'></img>
            </div>
          )}
          
        </div>

        
        
        

              
    </div>
  </div>

  );
};

export default LoginSignupScreen;
