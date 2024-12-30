import Image from "next/image";
import { CarouselPlugin } from "./carousel";
import { imageLib } from "../lib/imageLibrary";

export const Discovers = () => {
    return(
      <section className="  py-16">
       
        <div className="">
            <CarouselPlugin/>
        </div>

        <div className="">

        <div className="">
            <h1 className=" text-[15px] text-gray-900 ">All software</h1>
            <div className="flex flex-wrap gap-2  " >
                   {
                                  imageLib.map((data,index)=>{
                  
                                    return(
                                      <div key={index} className=" border p-6 mx-2 shadow-md rounded-[5px]   " >
                                         <Image src={data.src} className="w-[40px]  h-[40px]" width={40} height={40} alt="image"/>
                                         <p className="text-gray-900 text-center"> {data.name}</p>
                                      </div>
                                      
                                    )
                                  })
                                }
            </div>
        </div>

        <div>
          <h1 className="font-sans text-sm ">
            Graphics
          </h1>
          <div>

          </div>
        </div>
        </div>
      </section>
    );

}