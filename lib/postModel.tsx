'use server'

import { ObjectId } from "mongodb";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
 const Schema = mongoose.Schema

 const postModel = new Schema({
//    file_id:{
//     type:ObjectId,
//    },
  title:{
    type:String,
    required:true

  },
  image:{
    type:String
  }

 }
 ,{
    timestamps:
    true
})

 export const Post = mongoose.models.post||mongoose.model("post",postModel)