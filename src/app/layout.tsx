import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import NavBar from "../../components/navbar"
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader';
import { UiProvider } from "../../contexts/UiContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'],variable: '--font-inter',
display:'swap' })
const poppins = Poppins({
  weight: [ '400', '700'],
  subsets:['latin'],
  variable: '--font-poppins',
  display:'swap'
})


export const metadata: Metadata = {
  title: 'Smart Recruiter',
  description: 'Automated Recruitment System',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (

   <GoogleOAuthProvider clientId="211549487183-jpnkap08rac2041o0cptri8g422sl4na.apps.googleusercontent.com">
     <UiProvider>
        <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
        <body suppressHydrationWarning={true} >
      
          <Toaster/>
          <NextTopLoader color='#1ABBAC' />
          
          
          {children}
        </body>
          
        </html>
    </UiProvider>
    </GoogleOAuthProvider>
       
  )
}
