import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r h-[10vh] from-emerald-900 to-slate-900 text-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-blue-400 text-transparent bg-clip-text">
              ArtiGen
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/chatbot">ChatBot</NavLink>
            <NavLink href="/usage">Usage</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-emerald-200 hover:text-white hover:bg-emerald-800"
            >
              Login
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
              Sign Up
            </Button>
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
