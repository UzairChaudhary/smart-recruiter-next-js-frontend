"use client"
import React, {useEffect,useState} from 'react'

export default function page({params}) {
    const [videoQuestionURLs, setvideoQuestionURLs] = useState();
    
    useEffect(() => {
    
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/getJobById/${params.id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.success){
                console.log(result)
                setvideoQuestionURLs(result.videoURLs)
            }
        })
          .catch(error => console.log('error', error));
    }, [])
       
  return (
    <div>
       k
    </div>
  )
}
