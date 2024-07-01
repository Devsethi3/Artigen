"use client";

import Link from "next/link";
import React, { use } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="bg-gradient-to-r h-[10vh] border-b border-emerald-700 from-emerald-900 to-slate-900 text-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-blue-400 text-transparent bg-clip-text">
              ArtiGen
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            <Link href="/pricing">Pricing</Link>
            <Link href="/chatbot">ChatBot</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div>
                <Image
                  src={user.imageUrl}
                  alt={user.firstName || "user"}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-emerald-200 hover:text-white hover:bg-emerald-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="text-emerald-200 hover:text-white transition duration-150 ease-in-out"
  >
    {children}
  </Link>
);

export default Navbar;
