"use client"
import { useRef, useState,useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

import { useUiContext } from "../../../contexts/UiContext";
import { actioTypes } from "../../../reducers/uiReducer";
const CreateJob = () => {
    const [user, setUser] = useState();
    const [fileURL, setfileURL] = useState(null);
    const logoInput = useRef(null);
    const [logo, setLogo] = useState("");
    const router = useRouter()
    const defaultDP = "https://firebasestorage.googleapis.com/v0/b/final-year-project-e2eca.appspot.com/o/files%2Fdefault-dp.png?alt=media&token=efcf17aa-c16c-4ac0-9608-48576bc0c677"

    const { dispatch } = useUiContext();

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
            console.log("result success false")
          
        }
        console.log(user)
    })
      .catch(error => console.log('error', error));
}, [])

   

      useEffect(() => {
        //console.log("fileURL:", fileURL);
        if (fileURL){
          saveProfile(fileURL)
        }
      }, [fileURL]);
    
      
      
    
      const handleSaveProfile = async (e) => {
        e.preventDefault()
        
        if (logo) {
            try {
                // Upload file to Firebase
                await uploadFileToFirebase();
        
              } catch (error) {
                console.error('Error uploading file:', error);
              }
        } else {
          
          console.log('NO Changes');
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
      
          if (result.success) {
            // Update fileURL state
            setfileURL(result.url);
          } else {
            // Handle the case where the upload was not successful
            console.error('File upload failed:', result.message);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          throw error; // Propagate the error to the caller
        }
      };
      
      const saveProfile=(URL)=>{
        var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var raw1 = JSON.stringify({
      "avatar": URL
      
    });
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
          toast.success(result.message)
          dispatch({ type: actioTypes.profilePicUpdated });
          if(getCookie("user")==="recruiter"){

              setCookie("recruiter", result.recruiter)
          }
          else{

            setCookie("candidate", result.candidate)
          }
          router.push('/')
          }
          else{
            
            toast.error(result.message)
          }
      })
      .catch(error => console.log('error', error));
      }
    
      


  return (
    <>
        <div className='rounded-2xl ml-auto mr-auto max-w-7xl bg-hero-gradient py-20 pb-28 '>
        </div>
        <button 
        onClick={()=>router.back()}
        className="btn flex-align-center gap-2 text-white bg-black_color hover:bg-opacity-80 absolute top-28 mt-1 left-48 ">
          
            
              <FiChevronLeft />
              <span>back</span>
            
          
        </button>
        <h1 className='text-md font-poppins absolute top-40 mt-1 left-48  text-white'>Home / Post Job</h1>
        <div className="avatar font-poppins absolute top-40 mt-12 left-48 flex items-center gap-3" suppressHydrationWarning={true}>
 
            <div className="w-28 relative">
                
    
          <input
            type="file"
            accept="image/*" // Specify that only image files are accepted

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
                className="rounded-full border border-black_color"
              />
            ) : (
              <div className="w-28 h-16 rounded-full grid place-items-center  top-1 -bottom-8 absolute dark:border-hover-color">
                <img src={user?.avatar} className="rounded-full"></img>
                <FaCamera className="text-3xl opacity-60 dark:text-slate-500 fixed mt-32 " />
                
              </div>
            )}
          </div>
        
                
            
            </div>
            
        
        </div>

        

        

        <div className="rounded max-w-3xl w-full mx-auto font-poppins">
        <h1 className="text-2xl font-medium mt-10 flex justify-center">Update Profile Information</h1>
        {/*---------------------------------------- Form------------------------------------- */}

        
          
          
        
        
        
        
        
        
        
        
        
        <button 
        className="bg-black_color text-white py-2 rounded-md w-full mt-4 hover:bg-opacity-90"
        onClick={(e)=>handleSaveProfile(e)}
        >
        Save Information
        </button>
      </div>
          
          
          
        <Footer/>
       
    </>
  );
};

export default CreateJob;
