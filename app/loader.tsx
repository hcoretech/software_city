import Image from "next/image"


export default function Loader(){
    return(
        <div className="justify-center items-center center  ">
            <Image className="w-[35px] h-[35px] animate-pulse" src='/softc.svg' alt="loader" width={35} height={35}/>
        </div>
    )
}