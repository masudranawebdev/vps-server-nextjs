"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "@/context/context";
import { BiSolidLeftArrowSquare } from "react-icons/bi";
import { useContext, useEffect, useRef, useState } from "react";

const DashBoardNavbar = ({
  isSidebarOpen,
  setSidebarOpen,
  setMinibarOpen,
  isMinibarOpen,
}) => {
  // Assuming you are using functional components with hooks
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const menuRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primaryColor border-l">
      <div className="pl-1 pr-3 lg:px-5">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="flex-shrink-0 mr-5 hidden lg:block"
            >
              {isSidebarOpen ? (
                <BiSolidLeftArrowSquare className="text-2xl text-white" />
              ) : (
                <IoMdClose className="text-2xl text-white" />
              )}
            </button>
            {/* <fieldset className="space-y-1 rounded-md">
              <label htmlFor="Search" className="hidden">
                Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="button"
                    title="search"
                    className="p-0 focus:outline-none focus:ring"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 text-white"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search..."
                  className="w-auto lg:w-64 py-2 px-7 focus-none outline-none text-sm rounded-md"
                />
              </div>
            </fieldset> */}
          </div>

          <div className="shrink-0">
            <div className="flex items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => {
                      toggleDropdown();
                    }}
                    ref={menuRef}
                    className="relative flex max-w-xs items-center rounded-full text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                  >
                    <CgProfile size={30} />
                  </button>
                </div>

                <div
                  className={`absolute ${
                    isDropdownOpen ? "right-0" : "hidden"
                  } z-10 mt-2 w-40 origin-top-right rounded bg-white shadow-2xl focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    href="/admin/my-profile"
                    className="block px-4 py-2 text-sm text-center w-full rounded hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleDropdown;
                    }}
                    className="block px-4 py-2 text-sm w-full rounded hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              type="button"
              onClick={() => setMinibarOpen(!isMinibarOpen)}
              className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {isMinibarOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNavbar;
