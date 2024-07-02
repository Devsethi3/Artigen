import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      {/* Left side - Sign In */}
      <div className="w-full col-span-1 flex items-center justify-center p-8 lg:p-16">
        <SignUp />
      </div>

      {/* Right side - Image */}
      <div className="w-full col-span-2 relative hidden lg:block">
        <Image
          src="/showcase.png"
          alt="sign-in"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default SignInPage;
