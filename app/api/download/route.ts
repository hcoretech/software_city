
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { GridFSBucket, ObjectId,  } from "mongodb";
import { ReadPreference } from "mongodb";
import client from "../../../lib/mongodb";
import { createReadStream } from "fs";
import { pipeline } from "stream";

const db = client.db();

const GridFSBucketOptions = {r

   
    

    const array = await cursor.toArray()
     
    res.send(array)
    // const uploadFilename = array[0].filename

    // console.log(array)
    // return new NextResponse().arrayBuffer()
  }
  catch(error){
   return new NextResponse(error,{status:400})
  }
    

}