"use client";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path="/sign-up" routing="path" signInUrl="/sign-up" 
   redirectUrl="/crow"/>
  );

export default SignUpPage;