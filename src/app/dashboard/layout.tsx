"use client";

import React, { useState } from "react";
import SidebarHeader from "./_component/SidebarHeader";
import Sidebar from "./_component/Sidebar";
import { TotalUsageContext } from "@/context/TotalUsageContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const [totalUsage, setTotalUsage] = useState<Number>(0)
  return (
    <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
      <div className="grid min-h-screen w-full lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <SidebarHeader />
          <main className="flex flex-1 flex-col gap-4 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </TotalUsageContext.Provider>
  );
};

export default Layout;
