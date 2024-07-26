import { Input } from "./ui/input";
import { FormControl,FormField,FormLabel,FormMessage } from "./ui/form";
import React from "react";
import {Control,FieldPath} from 'react-hook-form';
import { z } from "zod";
import { authFormSchema } from "../lib/utils";

const formSchema = authFormSchema('sign-up');
interface CustomInput{
    control : Control<z.infer<typeof formSchema>>,
    name:FieldPath<z.infer<typeof formSchema>>,
    label:string,
    placeholder:string,
    id:string
  
}

const CustomInput =({control,name,label,placeholder, id})=>{
    return(
       <FormField
       control={control}
       name={name}
       render={({field})=>(
        <div className="flex-col gap-1.5 flex">
        <FormLabel>
            {label}
        </FormLabel>
        <div>
            <FormControl>
                <Input
                
                id={id}
                // aria-label={Ld}
                placeholder={placeholder}
                type={name==='password' ?'password':'text'}
             
                {...field}
                />
            </FormControl>
        </div>
        </div>

    )}
       />
         
      
    );
}
export default CustomInput;
