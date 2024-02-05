"use client"
import { FiChevronLeft } from "react-icons/fi"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function JobDetails  ({params}) {
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
    
        var requestOptions = {
          method: 'GET',
          credentials:'include',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3000/api/v1/recruiter/myprofile", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.success){
    
                setUser(result.recruiter);
            }
            //console.log(result)
        })
          .catch(error => console.log('error', error));
    }, [])

    return(
        <>
        <div className='rounded-2xl ml-auto mr-auto max-w-7xl bg-hero-gradient py-20 pb-28 '>
        </div>
        <button 
        onClick={()=>router.back()}
        className="btn flex-align-center gap-2 text-white bg-black_color hover:bg-opacity-80 absolute top-28 mt-1 left-48 ">
          
            
              <FiChevronLeft />
              <span>back</span>
            
          
        </button>
        <h1 className='text-md font-poppins absolute top-40 mt-1 left-48  text-white'>Home / Job Details</h1>
        <div className="avatar font-poppins absolute top-40 mt-12 left-48 flex items-center gap-3" suppressHydrationWarning={true}>
 
            <div className="w-28 ">
                <img src={user?.avatar} className="rounded-full border border-blue_color" />
            </div>
            
           
            <div className="flex flex-col mt-8">
            <span className="text-lg font-bold">{user?.name}</span>
            <span className="text-sm text-blue_color">{user?.email}</span>
            </div>
        </div>
        </>
    )
}