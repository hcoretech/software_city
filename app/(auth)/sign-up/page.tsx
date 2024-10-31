import AuthForm from "../../../components/authForm";

import { Metadata } from "next";

export const metadata :Metadata = {
  title:'sign-up',

}

const SignUp =()=>{
    return(
        <section className="flex-center size-full">
           <AuthForm type="sign-up"/> 
        </section>
    );
}

export default SignUp;