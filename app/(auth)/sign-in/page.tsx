import Link from "next/link";
import AuthForm from "../../../components/authForm";
import { Metadata } from "next";

export const metadata :Metadata = {
  title:'sign-in',

}

const SignIn =()=>{
    return(
        <section className ='flex flex-col flex-center size-full'>
          <AuthForm type="sign-in"/>
        </section>
    );
}

export default SignIn;