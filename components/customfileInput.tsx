import { Input } from "./ui/input";
import { FormControl,FormField,FormLabel,FormMessage } from "./ui/form";
import React from "react";
import {Control,FieldPath} from 'react-hook-form';
import { z } from "zod";
import { authFormSchema } from "../lib/utils";

// const formSchema = authFormSchema('sign-up');

// interface CustomFileInput{
   
//     name:string,
//     label:string,
//     placeholder:string,

  
// }

const CustomFileInput =({name,label,placeholder,})=>{
    return(
       <FormField
    
       name={name}
       render={({field})=>(
        <div className="flex-col gap-1.5 flex">
        <FormLabel>
            {label}
        </FormLabel>
        <div>
            <FormControl>
                <Input
                
                // id={id}
                // aria-label={Ld}
                placeholder={placeholder}
                type={name==='fle' ?'file':'text'}
             
                {...field}
                />
            </FormControl>
        </div>
        </div>

    )}
       />
         
      
    );
}
export default CustomFileInput;
