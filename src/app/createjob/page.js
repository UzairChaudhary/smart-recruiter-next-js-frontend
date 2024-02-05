"use client"
import { useRef, useState,useEffect } from "react";
import { BiLink,BiFile } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Footer from "../../../components/Footer";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Loader from "../../../loaders/Loader"

const CreateJob = () => {
    const [user, setUser] = useState();
    const [name, setname] = useState();
    const [experience, setexperience] = useState();
    const [jobtype, setjobtype] = useState("");
    const fileInput = useRef(null);
    const [file, setFile] = useState("");
    const [fileURL, setfileURL] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    

    const [tag, setTag] = useState();
    const [tags, setTags] = useState([]);

    const router = useRouter()

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tag) {
        setTags([...tags,  tag ]);
        }
        setTag("");
        console.log(tags)
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };

      useEffect(() => {
        //console.log("fileURL:", fileURL);
        if (fileURL){
          postJob(fileURL)
        }
      }, [fileURL]);
    
      const isFileValid = (file) => {
        const allowedExtensions = ['.pdf'];
        const extension = file.name.toLowerCase().slice((file.name.lastIndexOf('.') + 1));
        
        if (allowedExtensions.includes(`.${extension}`)) {
          
          return true;
        } else {
          toast.error('Please upload a valid PDF file only');
          return false;
        }
      };
      
    
      const handlePostJob = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(name===undefined){
          toast.error('Please enter Job Title');
          return
        }
        if (tags.length===0){
            toast.error('Please enter Skills');
            return
          }
        if(experience===undefined){
          toast.error('Please enter Experience');
          return

        }
        if (jobtype===""){
          toast.error('Please select Job Type');
          return
        }
        

        if (file) {
          if (isFileValid(file)) {
            try {
              // Upload file to Firebase
              await uploadFileToFirebase();
      
            } catch (error) {
              setIsLoading(false)
              console.error('Error uploading file:', error);
            }
          }
        } else {
          setIsLoading(false)
          toast.error('Please select a file');
          console.log('error');
          return
        }
      };
      
      const uploadFileToFirebase = async () => {
        try {
          const formData = new FormData();
          formData.append('filename', file);
      
      
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
      
      const postJob=(URL)=>{
        var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var raw1 = JSON.stringify({
      "title": name,
      "descriptionFile": URL,
      "jobType":jobtype,
      "experience":experience,
      "skills":tags
      
    });
    console.log(raw1)
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders2,
      credentials: 'include',
      body: raw1,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/api/v1/job/post", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.success){
          console.log('Form submitted successfully!');
          setIsLoading(false)
          toast.success("Job Created Successfully")
          router.push('/')
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
 
            <div className="w-28 ">
                <img src={user?.avatar} className="rounded-full border border-blue_color" />
            </div>
            
           
            <div className="flex flex-col mt-8">
            <span className="text-lg font-bold">{user?.name}</span>
            <span className="text-sm text-blue_color">{user?.email}</span>
            </div>
        </div>

        

        <div className="rounded max-w-3xl w-full mx-auto font-poppins">
        <h1 className="text-2xl font-medium mt-10 flex justify-center">Job Application Form</h1>
        {/*---------------------------------------- Form------------------------------------- */}

        
          <div className="form-input w-full sm:flex-1 relative mt-5">
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => {setname(e.target.value)}}
              required
              
            />
            <label htmlFor="skills">Job Title</label>
          </div>
          
        
        <div>
          <form className=" " onSubmit={handleSubmit}>
            <div className="form-input w-full sm:flex-1 relative">
              
              <input
                type="text"
                className="input"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              />
              <label htmlFor="name">Add Skills</label>
            </div>

            <div className="flex-align-center gap-2 flex-wrap">
              {tags?.map(( tag, index ) => (
                <div
                  className="flex-center-between gap-1 p-1 mb-5 bg-blue_color rounded-md text-white dark:bg-hover-color"
                  key={index}
                >
                  <span className="text-sm capitalize">{tag}</span>
                  <div
                    className="sm:cursor-pointer"
                    onClick={() => removeTag(index)}
                  >
                    <FaTimes className="text-sm hover:text-black" />
                  </div>
                </div>
              ))}
              </div>
          </form>
        </div>
        
        
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            className="input"
            value={experience}
            onChange={(e) => {setexperience(e.target.value)}}
            required
          />
          <label htmlFor="experience">Experience Required</label>
        </div>
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            className="input"
            value={jobtype}
            onChange={(e) => {setjobtype(e.target.value)}}
            required
          />
          <label htmlFor="Job Type">Job Type</label>
        </div>
        
        {/* Upload Job description File */}
        <div className=" w-full sm:flex-1 relative border rounded-md border-slate-300 ">
              <input
                type="file"
                hidden
                className="input "
                ref={fileInput}
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              
              <button
                className="btn flex-align-center text-[#8d9193] gap-2"
                onClick={() => fileInput.current.click()}
              >
                <BiLink />
                <span >Upload Job Description File</span>
              </button>
        </div>
          
          {file && (
            <div className="flex-align-center gap-2 mt-3 text-primary">
              <BiFile />{" "}
              <p>
                {file.name.length > 30
                  ? file.name.split(".")[0].slice(0, 20) +
                    "..." +
                    file.name.split(".")[1]
                  : file.name}
              </p>
            </div>
          )}
        
        <button 
        className="bg-black_color text-white py-2 rounded-md w-full mt-4 hover:bg-opacity-90"
        onClick={(e)=>handlePostJob(e)}
        >
        post job
        </button>
      </div>
        {isLoading && <Loader/>}
          
          
          
        <Footer/>
       
    </>
  );
};

export default CreateJob;
