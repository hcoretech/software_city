import Link from "next/link";

export default function Welcome(){
    return(
    <section>
        <div>
        <div id="section" className=" items-center flex flex-col relative mx-w-5xl mx-auto pt-20 phone:pt-20">
                 <div className="">
                    <h1 className="text-slate-900 font-sans font-extrabold text-4xl   text-center tracking-tight ">
                   Software city
                    </h1>
                 </div>
                 <div>
                 <p className="text-slate-600 my-6 text-2xl font-sans font-bold text-center  mx-auto max-w-3xl">software-city a community  that  provide your softwares need  with Installation guide rangings from latest software update </p>
                 <p className="text-slate-600 my-6 p-2 font-sans  shadow-md  text-center"> contribute to community buy storage 50gb for high discount and share your software to friends or family afar</p>
                 </div>

                 <div className="p-3">
                 <button className="text-black shadow-2xl text-center px-[20px] py-[5px] border shadow-blue-400 rounded-md">
                    <Link href='/discover'> Get started</Link>
                    </button>
                 </div>
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