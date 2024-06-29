import React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "./_components/AuthForm";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-blue-100 dark:from-emerald-900 to-yellow-100 dark:to-violet-900 items-center h-screen justify-center">
      <Link href="/">
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-blue-400 text-transparent bg-clip-text">
          ArtiGen
        </span>
      </Link>
      <h2 className="text-2xl my-2 text-center font-semibold">
        Sign in to your account
      </h2>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
