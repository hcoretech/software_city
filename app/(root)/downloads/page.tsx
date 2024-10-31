// import DownloadP from "../../../components/downloads";
import GetDownload from "../../../components/downloads";

import { Metadata } from "next";

export const metadata :Metadata = {
  title:'download',

}


export default function Downloads (){

    return(
         <section> 
            <GetDownload />
        </section>
    );
}