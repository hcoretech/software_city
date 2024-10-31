import Image from "next/image";
import { CarouselPlugin } from "./carousel";

export const Discovers = () => {
    return(
      <section className="  py-16">
       
        <div className="">
            <CarouselPlugin/>
        </div>

        <div className="">

        <div className="">
            <h1 className="font-bold  font-sans text-sm bg-[#05140C] text-white p-1">All software</h1>
            <div className="flex overflow-x-scroll  overscroll-none " >
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            <Image className="w-[25px] h-[25px]" width={100} height={100} src='/main.svg' alt="logo"/>
            
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