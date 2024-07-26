import { GoHome } from "react-icons/go";
import { TbCategory } from "react-icons/tb";

export const sideBarLink =[
    {   
        label:'Home',
        route:"/Home",
        icon:<GoHome className="w-[85px] h-[85px] text-gray-500"/>
    },
    {
        label:'Categories',
        route:"/downloads",
        icon:<TbCategory className="w-[30px] h-[30px] text-gray-500"/>
    },
    {
        
    }
]