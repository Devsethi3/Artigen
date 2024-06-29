import React from "react";
import SidebarHeader from "./_component/SidebarHeader";
import Sidebar from "./_component/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <SidebarHeader />
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
