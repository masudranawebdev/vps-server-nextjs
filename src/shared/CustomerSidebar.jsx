"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImUser } from "react-icons/im";
const CustomerSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col w-64 px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l">
      <Link href="/customers-dashboard" className="flex items-center px-4 -mx-2">
        <div className="w-12 h-12 bg-gray-300 border-2 rounded-full overflow-hidden">
          <ImUser className="text-5xl mt-1 inline-block" />
        </div>
        <div className="flex flex-col">
          <span className="mx-2 font-medium text-gray-800">Hello, </span>
          <span className="mx-2 font-medium text-gray-800">Masud Rana</span>
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            className={`flex items-center px-4 py-2 hover:text-gray-700 hover:bg-gray-100 rounded-md ${
              pathname === "/customers-dashboard" && "text-gray-900 bg-gray-100"
            }`}
            href="/customers-dashboard"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Orders</span>
          </Link>

          <Link
            className={`flex items-center px-4 py-2 mt-1 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/customers-dashboard/account" &&
              "text-gray-900 bg-gray-100"
            }`}
            href="/customers-dashboard/account"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Accounts</span>
          </Link>
          <Link
            className={`flex items-center px-4 py-2 mt-1 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-100 hover:text-gray-700 ${
              pathname === "/customers-dashboard/setting" &&
              "text-gray-900 bg-gray-100"
            }`}
            href="/customers-dashboard/setting"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium">Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
