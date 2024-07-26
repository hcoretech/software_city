import Link from "next/link";
import AuthForm from "../../../components/authForm";

const SignIn =()=>{
    return(
        <section className ='flex flex-col flex-center size-full'>
          <AuthForm type="sign-in"/>
        </section>
    );
}

export default SignIn;