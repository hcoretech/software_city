// import { Create } from "../../../components/create"
import Create from "../../../components/create"

import { Metadata } from "next";

export const metadata :Metadata = {
  title:'home',

}


export default function HomeScreen (){
    
    return(
        <section className="flex w-full min-h-screen justify-center">
            <Create />
        </section>
    )
}