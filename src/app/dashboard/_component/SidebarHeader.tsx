"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HiMenu, HiTemplate } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHistory, FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { SiChatbot } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";
import { useClerk, UserButton } from "@clerk/nextjs";
import PlanUsage from "@/components/PlanUsage";
import Image from "next/image";

const MenuList = [
  {
    name: "Home",
    icon: FaHome,
    path: "/dashboard",
  },
  {
    name: "AI Templates",
    icon: HiTemplate,
    path: "/dashboard/templates",
  },
  {
    name: "History",
    icon: FaHistory,
    path: "/dashboard/history",
  },
  {
    name: "Pricing",
    icon: MdOutlinePayment,
    path: "/dashboard/pricing",
  },
  {
    name: "Chatbot",
    icon: SiChatbot,
    path: "/dashboard/chatbot",
    style: "new",
  },
];

const SidebarHeader = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10",
      userButtonPopoverCard: "bg-blue-100", // Custom background for
      userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
    },
  };

  const { openUserProfile } = useClerk();

  const path = usePathname();

  return (
    <div className="sticky inset-0 z-10 bg-[#F7FDFB]">
      <header className="flex h-14 lg:h-[80px] items-center justify-between gap-4 border-b wrapper">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <HiMenu className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-full overflow-x-auto">
            <div className="flex flex-col gap-2 px-4 py-6">
              <Link
                href="/"
                className="flex items-center gap-2 mb-5 font-semibold"
                prefetch={false}
              >
                <Image
                  src="/logo.png"
                  width={40}
                  height={40}
                  alt="logo"
                  className="rounded-full"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-blue-400 text-transparent bg-clip-text">
                  ArtiGen
                </span>
              </Link>
              <nav className="grid items-start text-sm font-medium">
                {MenuList.map((list) => {
                  const Icon = list.icon;
                  return (
                    <Link
                      key={list.name}
                      href={list.path}
                      className={`flex items-center text-lg gap-3 rounded-lg px-3 py-2 my-1 transition-all ${
                        path === list.path
                          ? "bg-primary text-white hover:bg-none"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      prefetch={false}
                    >
                      <Icon className="h-4 w-4" />
                      {list.name}
                      {list.style ? (
                        <div className="text-xs bg-indigo-600 px-2 py-1 text-white rounded-full">
                          {list.style}
                        </div>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="absolute bottom-4 w-full left-0 wrapper">
              <Button className="w-full mb-4" onClick={() => openUserProfile()}>
                <IoMdSettings size={20} className="mr-2" />
                Settings
              </Button>
              <PlanUsage />
            </div>
          </SheetContent>
        </Sheet>
        <div className="">
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4 mr-3 lg:mr-5 md:ml-auto md:gap-2 lg:gap-4">
          <UserButton afterSignOutUrl="/" appearance={userButtonAppearance} />
        </div>
      </header>
    </div>
  );
};
  
export default SidebarHeader;

