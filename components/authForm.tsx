'use client'
import {  z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
 import { LuLoader2 } from "react-icons/lu";

import {
    Form,
    // FormControl,
    // FormField,
    // FormItem,
    // FormLabel,
    // FormMessage
} from "./ui/form";
import { authFormSchema } from "../lib/utils";
import CustomInput from "./customInput";
import { Button } from "./ui/button";
import { useState } from "react";
import {  redirect, useRouter } from "next/navigation";
import Link from "next/link";








const AuthForm =  ({type}:{type:string}) => {

    const[datas,setData]=useState(null);
    const [message,setMessage]=useState('')
    const [error,setError] = useState(null);
    const [loading,setLoading]= useState(false)
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm <z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues : {
            email :"",
            password:""
        }
      
    })
   

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
      setLoading(true) ;
      const usersData = data ;

        try{

            if ( type==='sign-up' ) {

                // const userData: = {
                //   firstName:data.firstName!,
              //     lastName:data.lastName!,
              //     userName:data.userName!,
              //     email:data.email,
              //    password:data.password
              //  
              if(!usersData){
                return setError("no user data found ")
              }

               const Post = await fetch('/api/signUpRoute',{
                    method:'POST',
                    body:JSON.stringify(usersData), 
                    headers :{
                    'Content-type':'application/json'        
                    }
                   
                })
                const response = await Post.json();
                
                if(Post.status === 200){
                  router.push('/sign-in',{scroll:false})
                }

                if(Post.status === 400){
                  setError(response.error)
                }
           
             }
            if (type==="sign-in"){
               const userLogin = {
                email:data.email,
                password:data.password
               }
               const Post = await fetch('/api/loginRoute',{
                   method:'POST',
                    body:JSON.stringify(userLogin), 
                    headers :{
                    'Content-type':'application/json'        
                    }
               })
               const response:{res:string |object,status:number} = await Post.json();
               console.log(response)
               
               if (Post.status === 200) {

                 router.push('/home');
               }

               if(response.status === 400){
                setError(response.res)
               }
                // setMessage(Response.message);
          
              }      
        }
        catch(error){     
         return error
        }
        finally{
          setLoading(false)
        }
        
   
    }


return(
        <section className="flex  flex-col min-h-screen w-full justify-center py-10 items-center  max-w-[1024px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
           { type ==="sign-up" &&(
                       
                        <div>
                            <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' id='First Name' />
                            <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your Last name' id='Last Name'/>
                            <CustomInput  control={form.control} name='userName' label='UserName' placeholder='Enter your Username' id='userName' />   
                           
                    
                    </div>
                    )}
            {/* {type === "sign-in" &&( */}

                    <div> 
                    <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' id='Email' />
                    <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' id='Password' /> 
                    </div>
                    {/* </div> 
            )} */}
                      
                    {/* // )
                    // } */}
                 <Button 
                   type="submit"
                   disabled={loading}>
                   {type==="sign-up"
                   ?(loading ? <LuLoader2  className="animate-spin text-white w-[25px] h-[25px]"/>:"signup")
                   :(loading ? <LuLoader2  className="animate-spin text-white w-[25px] h-[25px]"/>:"signin")
                   }
                    </Button>
                </form>
              </Form>
             
              {
                 <div className="flex gap-3">
                  <p>
                    {type === "sign-in" ?"create an account"
                    : "already have an account"}
                 </p>
                 <Link className="text-blue-700" href={`${type === "sign-in" ?"/sign-up":"/sign-in"}`}>
                 {type === "sign-in"?"sign-up":"sign-in"}
               </Link>
                </div>
                }
                {type === "sign-in" &&(
                 <p className="text-red-600 font-semibold text-[16px] flex">{message}
                  </p>
                )}
                <div className="p-1">{
                  !loading &&
                  (
                  error &&(
                  <p className="p-1 rounded-sm text-white font-semibold text-center text-[16px] flex flex-wrap bg-red-500">
                    {error}
                  </p>
                  )
                )
                  }
                </div>
              
        </section>
    )
}

export default AuthForm;