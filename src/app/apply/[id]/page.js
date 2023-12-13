"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ApplyJob = ({ params }) => {
  const router = useRouter();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4YzJkNmM4ZTZiZmZmZWY1ZDkyMjMiLCJpYXQiOjE3MDI0MTMzNzR9.N6q85GLcAyESQ4kFrMO4nthiikkCkDaRTEdPh9k6FOE");

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        
        const response = await fetch(`http://localhost:3000/api/v1/job/getJobById/${params.id}`, requestOptions);

        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }

        const data = await response.json();
        setJobData(data.job);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [params.id]);

  return (
    <div>
      <h1>Job Data</h1>
      {jobData && (
        <div>
          <p>Title: {jobData.title}</p>
          <p>Company: {jobData.companyName}</p>
          <p>Description: {jobData.description}</p>
          {/* Add other fields as needed */}
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
