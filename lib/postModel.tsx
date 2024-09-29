'use server'

import { ObjectId } from "mongodb";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
 const Schema = mongoose.Schema

 const postModel = new Schema({
  userId:String,
  title:String,
  pathname:String,
  downloadUrl:String,
  url:String,
  // ImageLink:String,
  // path:String,
  // itemId:ObjectId,
  ContentType:String,
  // contentType:String
//   timeString:date.now()
 }
 ,{
    timestamps:
    true
})

 export const Post = mongoose.models.post||mongoose.model("post",postModel)
//  userid:userId,
//  title:tokenPayload,
//  pathname:blob.pathname,
//  downloadUrl:blob.downloadUrl,
//  url:blob.url,
//  contentType:blob.contentType