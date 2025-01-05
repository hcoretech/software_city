import Image from "next/image";
import { CarouselPlugin } from "./carousel";
import { imageLib } from "../lib/imageLibrary";
import Link from "next/link";

export const Discovers = () => {
    return(
      <section className="  py-16">
       
        <div className=" ">
            <CarouselPlugin/>
        </div>

        <div className="">

        <div className="">
            <h1 className=" font-bold text-sm text-gray-900 ">All software</h1>
            <div className="flex flex-row flex-wrap gap-5 px-2    ">
          {
                imageLib.map((data,index)=>{

                  return(
                    <div key={index} className=" gap-2 flex flex-col">
                    <Link href=""  className=" mx-2 rounded-[5px] shadow-md border-2  p-1 gap-4 flex flex-col items-center" >
                       <Image src={data.src} className=" shadow-sm w-[60px] h-[60px] image-center" width={50} height={50} alt="image"/>                     
                    </Link>
                    <p className="rounded-sm shadow-md bg-gray-900  text-white text-center"> {data.name}</p>
                   </div> 
                  )
                })
              }
            </div>
        </div>

        <div>
          <h1 className="font-bold text-sm ">
            Graphics
          </h1>
          <div>
          <div className="flex flex-row flex-wrap gap-5 px-2    ">
          {
                imageLib.map((data,index)=>{

                  return(
                    <Link href="" key={index} className=" mx-2 rounded-[5px] gap-4 flex flex-col items-center">
                       <Image src={data.src} className="  rounded-full w-[60px] shadow-sm h-[60px] image-center" width={50} height={50} alt="image"/>
                       <p className="rounded-sm shadow-md bg-gray-900 w-[60px] text-white text-center"> {data.name}</p>
                    </Link>
                    
                  )
                })
              }
            </div>

          </div>
        </div>
        </div>
      </section>
    );

}