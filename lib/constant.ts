import { error } from "console";

export const jwtSecret :string |undefined = process.env.my_SECRET 

// export const JwtCheck () => {
//     if(!jwtSecret || jwtSecret.length===0){
//        throw new error("no jwt secret found in your environment")
//     }   
//     return jwtSecret;
//    }