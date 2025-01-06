import Image from "next/image";
import Link from "next/link";
import { iconDisplay } from "../lib/searchLink";
import { Button } from "../components/ui/button";

export default function Welcome(){
    return(
    <section>
        <div>
        <div id="section" className=" items-center flex flex-col relative  pt-20 phone:pt-20 bg-gray-900 ">
                 <div className="">
                    <h1 className="text-white font-sans font-extrabold text-4xl  text-center tracking-tight ">
                   Software city
                    </h1>
                 </div>
                 <div className="">
                 <p className="text-white my-6 text-md  font-bold text-center  mx-auto max-w-3xl">Software-city a community  that  provide your softwares need  with Installation guide rangings from latest software update </p>
                 <p className="text-white my-6  text-md    text-center ">All Sofwares are scan properly for any virus before been posted to the software-city </p>
                 </div>

                 <div className="p-3">
                 <button className="text-white fontFamily-inter  shadow-2xl text-center px-[20px] py-[5px] border-2 border-[#29c665] hover:opacity-70  rounded-sm">
                    <Link href='/discover'> Get started</Link> 
                    </button>
                 </div>
                 
            </div>
            <div  className="flex justify-center">
                {
                    iconDisplay.map((data,index)=>{
                             const active =data.alt === data.name
                             const access = active ? "" :"hidden"
                        return(
                            <div className={`p-3 my-12 hover:animate-pulse `} key={index}>
                            <Image src={data.src} width={50} height={50} className="w-[50px] h-[50px]   hover:transition-delay-150 duration-5  " alt={data.alt}/>
                            <p className=" hover:rtfghbn  text-sm font-semibold">{data.name}</p>
                          </div>
                        ) 
                    })
               
                }
               
            </div>
            <div className="bg-gradient-to-b from-[#874DFB] [#874DFB]  to-[#000F0C] via-[#000] flex flex-row h-[230px] justify-between  items-center ">
                <div className=" ml-4">
                <h1 className="font-bold px-5 text-white text-[18px] text-center  ">
                    windows 11 lunching the latest version 25.1
                </h1>
                <p className="text-white text-sm">
                    the new version of the window 11 fixes issues with 
                    dot.net 4.9 netframework,improvise windows security,
                    mirror your android device with your computer bug 
                    fixed....<span> click for more</span> 
                    
                </p>
                
                </div>
                <div className="">
                    {/* <p className="text-white"> */}
                     <Image src="/windows11.jpg" alt="news" width={1400} height={230} className="w-[1400px] h-[230px]"/>
                     
                    {/* </p> */}
                </div>
            </div>
            <div className="p-4" >
                <Link className=" p-2 border border-gray-900 " href =''>
                   Get iso 
                 </Link>
            </div>
                 
            
            {/* <div>
                <h1 className="p-2">
                    software-city
                </h1>
                </div> */}
            {/* <div className="p-20 bg-black text-white ">
            <p>
            welcome to software city it not your normal playstore get apps 
            that you think is hard to get here,also with instruction on how to install  
           a full package all for the community 
           </p>
           </div> */}

           {/* <Link href='/discover'>
            get started
           </Link> */}
        </div>
    </section>
    );
}