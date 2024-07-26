'use server'
import { redirect } from "next/navigation";
import dbConnection from "./mongodb";
import { User } from "./userModel";
import { NextResponse } from "next/server";
import { trusted } from "mongoose";
import { cookies } from "next/headers";
import sessionClient from "./serverAction";
const jwt = require('jsonwebtoken')

// dbConnection();

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: "4m" })
}


export const getCurrentUser = async ()=>{
  const session = await getUser ();
  try{
    if(!session){
      return {
        status:400,
        message:'no user'
      }
    }
   const find = await User.findOne({_id :session._id}).sort({created:-1});
  //  console.log(find);
  //  if(!find){
  //   return {
  //     status:400,
  //     message:"no account found with this id"
  //   }
  //  }
   return {
    status:200,
    data:JSON.stringify(find)
   }

  }catch(error){
    throw error
  }
}



export const signUp = async ({...data}:SignUpParams) =>{
    const {firstName,lastName,userName,email,password}= data

    try{
       
        //  const strings= JSON.stringify(id);
        const creatAccount = await User.create({
            firstName:firstName,
            lastName:lastName,
            userName:userName,
            email:email,
            password:password,
            

        }
        );
        const resp = creatAccount;
        if(!resp){
            //  return NextResponse.json({message:'user creation failed'},{status:400})
            return null
        }else{
          return 'account created succesfully'
        }
        // return NextResponse.json({resp},{status:200})

        const ssession = createToken(resp._id);

        // cookies().set('authSession',session,{
        //     path:'/',
        //     httpOnly:true,
        //     sameSite:'strict',
        //     secure:true
        // })
        // console.log(session);
      //   const updateSession =await User.findByIdAndUpdate({_id:resp._id},{session});
      //   if(updateSession)
      //  return NextResponse.json({updateSession},{status:200})
      }
        // const token:string = createToken(creatAccount._id)
        // console.log( token);
        // let ok = true
        // const user = []
        // user.push(creatAccount);
        // return user;

        
     catch (error){
        throw error
    }
 
}

export const Login = async({...userLogin}:SignInParams) => {
    const {email,password} = userLogin;
 const user = [];
    try{
        const finds = await User.findOne({
          'email':email,
          'password':password         
        }).sort({createdAt: -1})

        if(!finds){
            return {
              status:400,
              message:'no user found',
              data:JSON.stringify(null)
            }
        }

        // console.log(finds._id)

     const session = createToken(finds._id);

      cookies().set('authSession',session,{
        path:'/',
        httpOnly:true,
        sameSite:'strict',
        secure:true,
        
      })
      return {
        status:200,
        message:"succes",
       data: JSON.stringify(finds._id)
      }
      // return NextResponse.json({finds},{status:200})
      
        // redirect('/')
        
     
        
     
      // console.log(session);
        

    }catch(error){
        throw error
    }

}

export const getUser = async() => {

   const Session = await sessionClient();
   if(!Session){
    return false;
   }
     const callback = (error,data) => {
      if(error){
        return false
      }
      return data
     }
     const value = jwt.verify(Session.value,process.env.my_SECRET,callback )
    //  console.log(value)
     return value
      //  if(value){
      //   return false ;
      //  }

  //   if(!value){
  //    console.log('session expired');
  //   //  return  "session expired"
  //   // throw Error
  //   redirect('/sign-in')
  //    // return NextResponse.json({message:'token expired login'},{status:400})
  //   }
  //  // console.log(Session);
  //   // return value ;
  //  }catch(error){
  // throw  error
  //  }

}


export const logOut = () =>{
  cookies().delete('authSession');
  redirect('/sign-in');
}