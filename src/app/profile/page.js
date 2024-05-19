"use client"
import { useRef, useState,useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { FiLock, FiMail,FiEye, FiEyeOff} from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine  } from "react-icons/ri";

import { useUiContext } from "../../../contexts/UiContext";
import { actioTypes } from "../../../reducers/uiReducer";
import Loader from "../../../loaders/Loader"
import Navbar from "../../../components/navbar";
const MyProfile = () => {
    const [user, setUser] = useState();
    const [fileURL, setfileURL] = useState(null);
    const logoInput = useRef(null);
    const [logo, setLogo] = useState("");
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);


    const { dispatch } = useUiContext();


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
  

    const checkNameValidation = () => {
      // Regular expression to match only numbers (no alphabets)
      const numberRegex = /^\d+$/;
    
      // Use the test method of the regular expression to check if the formName matches the pattern
      setIsNameValid(!numberRegex.test(formName));
    };

useEffect(() => {
    
    var requestOptions = {
      method: 'GET',
      credentials:'include',
      redirect: 'follow'
    };
    // Conditionally choose the API endpoint based on the user type
    const apiUrl = getCookie("user") === 'candidate' ?
    'http://localhost:3000/api/v1/candidate/myprofile' :
    'http://localhost:3000/api/v1/recruiter/myprofile';
    
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success){
            if(result.recruiter){
                setUser(result.recruiter);    
            }
            else{
                setUser(result.candidate);
            }
        
        }
        else{
            //console.log("result success false")
          
        }
        //console.log(user)
    })
      .catch(error => console.log('error', error));
}, [])

   

      useEffect(() => {
        //console.log("fileURL:", fileURL);
        if (logo){
          uploadFileToFirebase();
        }
      }, [logo]);
    
      
      
    
      const handleSaveProfile = (e) => {
        e.preventDefault()
       setIsLoading(true)
       // If any validation fails, return early
    
      
       if (formName!=='' || formPassword!=='' || formConfirmPassword!=='' || logo ){
        if (formName===user.name && formPassword==='' && formConfirmPassword==='' && logo===""){
          toast.error('Your name is the same as before. Please enter new details');
          setIsLoading(false)
          return;
        }
        if (formName!==''){

          if (!isNameValid) {
            toast.error('Name should not contain any number');
            setIsLoading(false)
            return ;
          }
          user.name=formName
        }
        
        if (formPassword!=='' || formConfirmPassword!==''){

          if (!isPasswordValid) {
            toast.error('Password must be atleast 6 characters');
            setIsLoading(false)
            return ;
          }
          if (!passwordsMatch) {
            toast.error('Passwords are not matching');
            setIsLoading(false)
            return ;
          }
        }
        
        saveProfile()

       }
        

        else {
          setIsLoading(false)
          //console.log('NO Changes');
          toast.error("You haven't made any changes to your profile");
          return
        }
      };
      
      const uploadFileToFirebase = async () => {
        try {
          const formData = new FormData();
          formData.append('filename', logo);
      
      
          const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
          };
      
          const response = await fetch('http://localhost:3000/api/v1/uploadFile', requestOptions);
          const result = await response.json();
      
          console.log(result);
          console.log("old avatar: ",user.avatar)
          if (result.success) {
            // Update fileURL state
            user.avatar=result.url;
            console.log("New : ",user.avatar)
          } else {
            // Handle the case where the upload was not successful
            console.error('File upload failed:', result.message);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          throw error; // Propagate the error to the caller
        }
      };
      
      const saveProfile=()=>{
        var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var raw1;
    if (formPassword!==''){

      raw1 = JSON.stringify({
        "avatar": user.avatar,
        "name": user.name,
        "password": formPassword
        
      });
    }
    else{
      raw1 = JSON.stringify({
        "avatar": user.avatar,
        "name": user.name,
        
        
      });
    }
    console.log(raw1)
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders2,
      credentials: 'include',
      body: raw1,
      redirect: 'follow'
    };
    const apiUrlProfile = getCookie("user") === 'candidate' ?
    'http://localhost:3000/api/v1/candidate/updateprofile' :
    'http://localhost:3000/api/v1/recruiter/updateprofile';
    
    fetch(apiUrlProfile, requestOptions)
      .then(response => response.json())
      .then(result => {
        
        if(result.success){
          console.log('Profile Updated successfully!');
          setIsLoading(false)
          toast.success(result.message)
          dispatch({ type: actioTypes.profilePicUpdated });
          if(getCookie("user")==="recruiter"){

              setCookie("recruiter", result.recruiter)
          }
          else{

            setCookie("candidate", result.candidate)
          }
          router.back()
          }
          else{
            setIsLoading(false)
            toast.error(result.message)
          }
      })
      .catch(error => console.log('error', error));
      }
    
      


  return (
    <>
    <Navbar/>
        <div className='rounded-2xl ml-auto mr-auto max-w-7xl bg-hero-gradient py-20 pb-28 '>
        </div>
        <button 
        onClick={()=>router.back()}
        className="btn flex-align-center gap-2 text-white bg-black_color hover:bg-opacity-80 absolute top-28 mt-1 left-48 ">
          
            
              <FiChevronLeft />
              <span>back</span>
            
          
        </button>
        <h1 className='text-md font-poppins absolute top-40 mt-1 left-48  text-white'>Home / Profile information</h1>
        <div className="avatar font-poppins absolute top-40 mt-12 left-48 flex items-center gap-3" suppressHydrationWarning={true}>
 
            <div className="w-28 relative">
                
    
          <input
            type="file"
            accept="image/*" // Specify that only image files are accepted
            className="border"
            hidden
            ref={logoInput}
            onChange={(e) => setLogo(e.target.files[0])}
          />
          
          
          <div
            className="sm:cursor-pointer"
            onClick={() => logoInput.current.click()}
          >
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt=""
                className="rounded-full border bg-white w-28 h-28 object-cover"
              />
            ) : (
              
              <div className="w-28 h-16 rounded-full grid mb-8 place-items-center dark:border-hover-color">
                <img src={user?.avatar} className="rounded-full w-28 h-28 border object-cover border-blue_color"></img>
                <FaCamera className="text-3xl opacity-60 dark:text-slate-500 absolute mt-32 " />
                
              </div>
              
              
              
            )}
          </div>
          
          
        
                
            
            </div>
            <div className="flex flex-col w-80 mt-8">
            <span className="text-lg font-bold mt-3">{user?.name}</span>
            <span className="text-sm text-blue_color">{user?.email}</span>
          </div>
            
        
        </div>

        

        

        <div className="rounded flex flex-col items-center mx-auto font-poppins">
        <h1 className="text-2xl font-medium mt-14 flex justify-center mb-10 ">Update Profile Information</h1>
        
        
        <div style={{width:"400px"}} className={`mb-3 flex items-center ml-5 border ${isNameFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color 
                ${!isNameValid ? 'border-red-500' : ''} `}>
              <GoPerson size={20} className={`mr-2 ${isNameFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                id="name"
                
                value={formName}
                placeholder= {`Change ${ getCookie("user")==="recruiter" ? 'Company Name' : 'Name'}`}
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-lg
                `}
                onFocus={() => setisNameFocused(true)}
                onBlur={() => {setisNameFocused(false); checkNameValidation() }}
                onChange={(e) => setFormName(e.target.value)}
              />
              </div>
              {!isNameValid && (
                <div className='flex justify-end items-end ml-40 mb-3'>
                  <span className='text-xs text-red-500 '>
                Name should not contain numbers only
              </span>
                </div>
              )
              
              }
              <div style={{width:"400px"}} className={`mb-3 flex items-center ml-5 border ${isEmailFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isEmailValid ? 'border-red-500' : ''} `}>
              <FiMail size={20} className={`mr-2 ${isEmailFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type="email"
                
                id="email"
                value={user?.email}
                disabled
                className={` w-full outline-none focus:outline-none text-gray-400 text-lg `}                
                
              />
              </div>
        
        
        <div style={{width:"400px"}}  className={`ml-5 mb-3 flex items-center border ${isPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!isPasswordValid ? 'border-red-500' : ''}`}>
              <FiLock size={20} className={`mr-2 ${isPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                
                id="password"
                value={formPassword}
                placeholder="Change password"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-lg
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
                <div className='flex justify-end ml-40 mb-3'>
                  <span className='text-xs text-red-500 '>
                Password must be atleast 6 characters
              </span>
                </div>
              )
              
              }
              <div style={{width:"400px"}}  className={`ml-5 mb-1 flex items-center border ${confirmPasswordFocused ? 'border-teal_color' : 'border-gray-200'} px-4 py-2 rounded-lg focus-within:border-teal_color
              ${!passwordsMatch ? 'border-red-500' : ''}`}>
              <RiLockPasswordLine size={20} className={`mr-2 ${confirmPasswordFocused ? 'text-teal_color' : 'text-gray-400'}`} />
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                value={formConfirmPassword}
                id="confirm_password"
                
                placeholder="Confirm Password"
                className={`text-black w-full outline-none focus:outline-none placeholder-gray-400 text-lg `}
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
                <div className='flex justify-end ml-56 mb-3'>
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
                  onClick={(e) => handleSaveProfile(e)}
                  >
                  Save Profile
                </button>
              </div>
      </div>
        {isLoading && <Loader/>}
          
          
          
        <Footer/>
       
    </>
  );
};

export default MyProfile;
