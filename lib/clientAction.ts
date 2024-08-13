"use server"

import { existsSync,statSync} from "fs"



export const downloadFile = async (DownloaData:fileDownload)=>{
    // console.log(DownloaData)
   
   const fileExit  = existsSync(`./public${DownloaData.fileLink}`) ;
    try{

      if (!fileExit){
         const response = {
            status:300,
            message:"no file found"
        }
        return response
      }
      
        const readFile = statSync(`./public${DownloaData.fileLink}`);
        const checkSize = readFile.size;
        console.log(checkSize);

        // for(let i=0 ; i <=checkSize;i++){
            if(checkSize !== DownloaData.filezie){

                const response = {
                   status: "pending",

                }
                return response;
            }else{
                // return "downloading"
            const response = {
                    status:"downloading",
                    Link:DownloaData.fileLink
                }
                return response;
            }

  
    }
    catch(error)
    {
      const response = {
       status:400,
       message: "file not found try again"
      }
      return response

    }
}