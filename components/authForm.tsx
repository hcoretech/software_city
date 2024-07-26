'use client'
import {  z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
 import { Login, signUp } from "../lib/clientAction";
 import { LuLoader2 } from "react-icons/lu";
 import { createQueryString } from "../lib/queryurl";
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
//     const [firstName,setFirstName]=useState('');
//     const [lastName,setLastName]=useState('');
//     const [userName,setUserName]=useState('');
//     const[email,setEmail]=useState('');
//     const[password,setPassword]=useState('');
    const[datas,setData]=useState(null);
    const [message,setMessage]=useState('')
// const {pending}=useFormStatus();
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
      setLoading(true)  
        try{
            if(type==='sign-up'){
             
             //   const string = JSON.stringify(userData)
              const userData = {
                firstName:data.firstName!,
                lastName:data.lastName!,
                userName:data.userName!,
                email:data.email,
                password:data.password
              }
            //   }
              // const response = await signUp(userData);
              
              // const result =  setData(response)
              // if(response !== null){
              // router.push('/sign-in')
              // }
            //  result.ok ? (co)
            // console.log(datas)
              
             
                
        //     let userKey ;

        const Post = await fetch('/api/signUpRoute',{
                    method:'POST',
                    body:JSON.stringify(userData), 
                    headers :{
                    'Content-type':'application/json'        
                    }
                   
                })
                const response = await Post.json();
                if(Post.status === 200){
                  router.push('/sign-in')
                }
                

        //    if(!res.ok) throw new Error('Login failed')
        //     const {token} = await post.json()
        // document.cookie = `token =${token} path:/`;
        
                       
        }
          if (type==="sign-in"){

            // setLoading(true)  
            const userLogin = {
                email:data.email,
                password:data.password
            }
            const Post =await fetch('/api/loginRoute',{
                   method:'POST',
                    body:JSON.stringify(userLogin), 
                    headers :{
                    'Content-type':'application/json'        
                    }
            })
            const Response = await Post.json();
            console.log(Response)
            if(Post.status === 200){
              router.push('/Home');
            }
            setMessage(Response.message);
          //   const response = await Login(userLogin)
          // if (response.status === 400){
          // //  setData(response.data);
          //   setMessage(response.message)
            
          // }
          // if(response.status === 200){
          //   setData(JSON.parse(response.data));
          //   setMessage(response.message)
            
            
          //   console.log(datas)
          //   router.push('/Home');
          // }
          
        }
      
    }catch(error){
           return error
        }finally{
          setLoading(false);
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
                 <p className="text-red-600 font-semi-bold text-[16px]">{ message}
                  </p>
                )}
              
        </section>
    )
}

export default AuthForm;