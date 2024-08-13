'use server'

import { ObjectId } from "mongodb";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
 const Schema = mongoose.Schema

 const postModel = new Schema({
  name:String,
  Filename:String,
  FileSize:Number,
  Description:String,
  ImageLink:String,
  path:String,
  itemId:ObjectId,
  ContentType:String,
//   timeString:date.now()
 }
 ,{
    timestamps:
    true
})

 export const Post = mongoose.models.post||mongoose.model("post",postModel)