import { type ClassValue, clsx } from "clsx"
// import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"
import {z} from  "zod";
// import { useCallback } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type:string) => z.object({
  firstName: type ==="sign-in" ? z.string().optional() :z.string().min(3),
  lastName: type ==="sign-in" ? z.string().optional() : z.string().min(3),
  userName: type === "sign-in" ? z.string().optional() : z.string().min(3),
  email:z.string().email(),
  password: z.string().min(10),
})


// const searchParams = useSearchParams

