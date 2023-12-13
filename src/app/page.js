"use client"
import React from "react";
import HeroSection from "../../components/HeroSection";
import JobSearchForm from "../../components/SearchJob";
import JobSection from "../../components/Jobs";

const Home = () => {
  return (
    <>
      <HeroSection />
      <JobSearchForm />
      <JobSection />
    </>
  );
};

// export async function getServerSideProps() {
//   const myHeaders = new Headers();
//   myHeaders.append(
//     "Cookie",
//     "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZjYzljZGRkZDJiN2RiYzBiY2QyNTQiLCJpYXQiOjE3MDIzMjI3MjJ9.tAVXPVL1vCCiZycmu7uTdtlrnzO7eT2M4YxRA9RUmHQ"
//   );

//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     redirect: "follow",
//   };

//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/v1/job/getJobs",
//       requestOptions
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const jobsData = await response.json();

//     return {
//       props: {
//         jobsData,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     // Return an empty object or handle the error based on your requirements
//     return {
//       props: {},
//     };
//   }
// }

export default Home;
