"use client";
import MiniSidebar from "@/shared/MiniSidebar";
import DashBoardNavbar from "@/shared/DashboardNavbar";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/context";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { isLoggedin } from "@/services/auth.services";
import { redirect, usePathname } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMinibarOpen, setMinibarOpen] = useState(false);
  const { loading, user } = useContext(AuthContext);
  const isLogged = isLoggedin();
  const pathname = usePathname();

  if (loading && !user) {
    return <BigSpinner />;
  }
  
  if (
    !isLogged ||
    user?.user_role !== "admin" ||
    user?.user_status !== "active" ||
    user?.user_verify !== true
  ) {
    return redirect("/signin?success_redirect=" + pathname);
  }

  return (
    <div className="flex h-screen">
      <div
        className={`hidden lg:block max-h-screen transition-all overflow-hidden overflow-y-auto scrollbar-thin duration-300 ease-in-out bg-white ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <MiniSidebar />
      </div>
      {/* ------ mobile menu ------ start */}
      <div
        className={`h-screen w-10/12 sm:w-4/12 fixed inset-y-0 left-0 z-50 bg-bgray-50 overflow-y-auto transition-transform duration-500 transform ${
          isMinibarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-screen flex-col justify-between border-e">
          <MiniSidebar />
        </div>
      </div>
      {/* ------ mobile menu ------ end */}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="shadow border-b border-gray-300 bg-[#FFFFFF]">
          {/* Top navigation content goes here */}
          <DashBoardNavbar
            setSidebarOpen={setSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            isMinibarOpen={isMinibarOpen}
            setMinibarOpen={setMinibarOpen}
          />
        </header>

        {/* Main content area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 max-h-[120vh] bg-gray-200">
          {/* Page content goes here */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
