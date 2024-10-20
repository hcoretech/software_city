import Image from "next/image";
import { CarouselPlugin } from "./carousel";

export const Discovers = async() => {
    return(
      <section className="w-full">
        <header className="  flex items-center gap-2">
          <div className="p-2 bg-black rounded-full"> 
            <Image className="w-[25px] h-[25px]" width={50} height={50} src='/main.svg' alt="logo"/>
            </div>
            <h1 className="font-sans font-bold text-md"> softwareCity</h1>
        </header>
        <div className="">
            <CarouselPlugin/>
        </div>
      </section>
    );

}