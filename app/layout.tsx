import type { Metadata } from "next";
import './globals.css';
import { Inter ,IBM_Plex_Serif } from "next/font/google";
// // import dbConnection from "../lib/mongodb";
// import { dbConnection } from "../lib/mongodb";
// import client from "../lib/mongodb";
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
  })
  
  const ibmPlexSerif = IBM_Plex_Serif({
    subsets:["latin"],
    weight:['400','700'],
    variable:'--font-ibm-plex-serif'
  })

 export const metadata :Metadata = {
    title:'software city',
    description:'web developer' 
}

export default function RootLayout({
    children,
}:{
    children:React.ReactNode
}){
    // dbConnection()
     
    return(
        <html lang="en" >
            <body  className={`${inter.variable} ${ibmPlexSerif.variable}`      
        }>
                {children}
            </body>
        </html>
    )
}