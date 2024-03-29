"use client";
import { AuthContext } from "@/context/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function CustomerDashboardLayout({ children }) {
  const { logout, user } = useContext(AuthContext);
  const pathName = usePathname();
  return (
    <div className="container flex h-screen">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="shadow border-b border-gray-300 bg-[#FFFFFF] mb-1">
          {/* Top navigation content goes here */}
          <nav className="relative bg-white shadow">
            <div className="flex justify-center lg:justify-start gap-2 px-2 -mx-4 md:py-0">
              <Link
                href="/customers-dashboard"
                className={`px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2 border-b ${
                  pathName === "/customers-dashboard" &&
                  "border-primary bg-gray-100"
                }`}
              >
                Order
              </Link>
              <Link
                href="/customers-dashboard/account"
                className={`px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2 border-b ${
                  pathName === "/customers-dashboard/account" &&
                  "border-primary bg-gray-100"
                }`}
              >
                Account
              </Link>
              <Link
                href="/customers-dashboard/setting"
                className={`px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 md:mx-2 border-b ${
                  pathName === "/customers-dashboard/setting" &&
                  "border-primary bg-gray-100"
                }`}
              >
                Setting
              </Link>
              {user && (
                <button
                  onClick={() => {
                    logout();
                  }}
                  className={`block lg:hidden px-2.5 py-2 text-danger hover:text-textColor transition-colors duration-300 transform rounded-lg hover:bg-danger md:mx-2 border-b`}
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </header>

        {/* Main content area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Page content goes here */}
          {children}
        </div>
      </div>
    </div>
  );
}
