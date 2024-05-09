import Footer from "../../../components/Footer";
import Applied from "../../../components/history/Applied"
import Offers from "../../../components/history/Offers"
import { getCookie } from "cookies-next"
import { cookies } from 'next/headers';

const MyJobs= () =>{
       

    return (
        <>
            
            <div className='w-full h-full bg-hero-gradient opacity-20 py-20 pb-32 '>
            </div>
          
            <h1 className='text-2xl font-poppins absolute top-32 left-40  text-black_color font-bold'>Applied Jobs History</h1>
            <h1 className='text-md font-poppins absolute top-40 mt-1 left-40  text-black_color'>Home / My Jobs</h1>
            
            <div className="mt-5">
            
                <div className="flex-1 basis-[16rem]">
                    <Offers />
                </div>
                <div className="">
                    <Applied />           
                </div>
                
            
            </div>
                <Footer/>
          
        </>
    )
}
export default MyJobs;