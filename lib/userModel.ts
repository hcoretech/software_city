'use server'
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
 const Schema = mongoose.Schema

 const userSchema = new Schema({
   
firstName:{
    type:String,
    required:true
    },
lastName:{
    type:String,
    required:true
   },
userName:{
    type:String,
    required:true
   },
email:{
    type:String,
    required:true
   },
password:{
    type:String,
    rquired:true
},
// session:{
//     type:String,
//     required:true
//     },

},{
    timestamps:
    true
});

 export const User = mongoose.models.user||mongoose.model('user', userSchema);
 

