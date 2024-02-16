"use client"
import React from 'react'
import { GoogleLogin, googleLogout   } from '@react-oauth/google';
function GoogleOAuth() {
  return (
    <div>
        <GoogleLogin
    onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  
/>
<div className='hover:cursor-pointer' onClick={()=>googleLogout()}>Logout</div>
   
    </div>

  )
}

export default GoogleOAuth
