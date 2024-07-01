"use client";

import PlanUsage from "@/components/PlanUsage";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHistory, FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { SiChatbot } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";

const Sidebar = () => {
  const MenuList = [
    {
      name: "Home",
      icon: FaHome,
      path: "/dashboard",
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

  const path = usePathname();

  const { openUserProfile } = useClerk();

  return (
    <div className="w-[256px]">
      <div className="hidden fixed h-full border-r w-[260px] wrapper lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex border-b h-[80px] w-full items-center px-4">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <span className="">ArtiGen</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start mt-5 gap-2">
              {MenuList.map((list) => {
                const Icon = list.icon;
                return (
                  <>
                    <Link
                      key={list.name}
                      href={list.path}
                      className={`flex items-center text-lg  gap-4 px-4 py-3 rounded-lg transition-all ${
                        path == list.path
                          ? "bg-primary text-white hover:bg-none "
                          : `hover:bg-secondary`
                      }`}
                      prefetch={false}
                    >
                      <Icon className="h-5 w-5" />
                      {list.name}
                      {list.style ? (
                        <div className="text-xs bg-indigo-600 px-2 py-1 text-white rounded-full">
                          {list.style}
                        </div>
                      ) : null}
                    </Link>
                  </>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="absolute bottom-10 w-full left-0 wrapper">
          <Button className="w-full mb-4" onClick={() => openUserProfile()}>
            <IoMdSettings size={20} className="mr-2" />
            Settings
          </Button>
          <PlanUsage />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
