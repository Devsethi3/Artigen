"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMenu } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MdDashboard } from "react-icons/md";
import { SiChatbot } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  const { openUserProfile } = useClerk();
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

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              {user ? (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Image
                        src={user.imageUrl}
                        alt={user.firstName || "user"}
                        width={55}
                        height={55}
                        className="rounded-full cursor-pointer p-2 hover:bg-secondary/30"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="mb-2">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2"
                        >
                          <MdDashboard size={18} className="mr-3" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="mb-2">
                        <Link
                          href="/dashboard/chatbot"
                          className="flex items-center gap-2"
                        >
                          <SiChatbot size={18} className="mr-3" />
                          Chatbot
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openUserProfile()}
                        className="cursor-pointer"
                      >
                        <IoMdSettings size={18} className="mr-5" />
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <HiMenu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-2 px-4 py-6">
                    <nav className="flex flex-col items-start text-lg font-medium space-y-4">
                      <Link
                        href="#pricing-cards"
                        className="px-3 py-2 rounded-lg hover:bg-secondary"
                      >
                        Pricing
                      </Link>
                      <Link
                        href="/dashboard/chatbot"
                        className="px-3 py-2 rounded-lg hover:bg-secondary"
                      >
                        ChatBot
                      </Link>
                      <Link
                        href="/dashboard"
                        className="px-3 py-2 rounded-lg hover:bg-secondary"
                      >
                        Dashboard
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
