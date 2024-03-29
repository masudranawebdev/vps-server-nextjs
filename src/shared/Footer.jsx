"use client";
import paymentIcon from "@/assets/images/logo/payment-method.png";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";
import { TbClockPause } from "react-icons/tb";
import { SiMinutemailer } from "react-icons/si";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";

const quickLinks = [
  { path: "/signin", label: "Sign In" },
  {
    path: "/cart",
    label: "View Cart",
  },
];

const helpfulLinks = [
  { path: "/about-us", label: "About Us" },
  { path: "/return-policy", label: "Return Policy" },
  { path: "/support-policy", label: "Support & Policy" },
  { path: "/all-branch", label: "All Branch" },
];

const Footer = () => {
  const { data: settingData = [], isLoading } = useQuery({
    queryKey: ["socialMedia"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/site_setting`);
      const data = res.json();
      return data;
    },
  });

  const handleEmailClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = `mailto:masudranainfo99@gmail.com`;
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <section className=" bg-primary text-textColor border-t-[2px] border-secondary">
      <div className="container mx-auto px-5 pt-10">
        {/* ------ footer top section ------ start */}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center lg:grid-cols-5 gap-5">
          {/* ------ company logo ------ start */}
          <div className="pr-10 flex justify-center items-start lg:justify-start">
            <Image
              src={settingData?.data[0]?.logo}
              alt="Landscape picture"
              width={200}
              height={150}
              className=" object-fill"
              loading="lazy"
            />
          </div>
          {/* ------ company logo ------ end */}

          {/* ------ account section ------ start */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[400]">
              <h2
                className="mb-3 lg:mb-6 text-secondary uppercase"
                style={{ fontSize: "20px" }}
              >
                Account
              </h2>
            </li>
            {quickLinks?.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-2 transition-all duration-300 hover:translate-x-1"
              >
                <Link href={item?.path} className="flex flex-col text-[14px]">
                  {item?.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* ------ account section ------ end */}

          {/* ------ company information ------ start */}
          <ul className="list-none ml-0 mb-0">
            <li className="leading-[30px] font-[400]">
              <h2
                className="mb-3 lg:mb-6 text-secondary uppercase"
                style={{ fontSize: "20px" }}
              >
                Company
              </h2>
            </li>
            {helpfulLinks?.map((item, index) => (
              <li
                key={index}
                className="flex items-center mt-2 transition-all duration-300 hover:translate-x-1"
              >
                <Link
                  href={item?.path}
                  className="flex flex-col text-[14px] hover:decoration-primaryColor"
                >
                  {item?.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* ------ company information ------ end */}

          {/* ------ company address section ------ start */}
          <div className="lg:col-span-2 pr-10">
            <h2
              className="mb-3 lg:mb-6 text-secondary uppercase"
              style={{ fontSize: "20px" }}
            >
              Contact Details
            </h2>
            <ul className="flex flex-col gap-y-1 list-none mt-5">
              <li className="flex items-center gap-3 mb-2">
                <span>
                  <BiSolidMap className="text-xl text-secondary" />
                </span>
                <address className="text-[14px] leading-4 font-[300]">
                  <strong>Address:</strong>
                  <span>{settingData?.data[0]?.address}</span>
                </address>
              </li>
              <li className="flex items-center gap-3 mb-2">
                <span>
                  <TfiHeadphoneAlt className="text-xl text-secondary" />
                </span>
                <h3 className="text-[14px] leading-4 font-[300]">
                  <strong>Call Us: </strong>
                  <span>{settingData?.data[0]?.contact}</span>
                </h3>
              </li>
              <li className="flex items-center gap-3 mb-2">
                <span>
                  <SiMinutemailer className="text-xl text-secondary" />
                </span>
                <h3
                  onClick={handleEmailClick}
                  className="text-[14px] leading-4 font-[300]"
                >
                  <strong>Email: </strong>
                  <span>{settingData?.data[0]?.email}</span>
                </h3>
              </li>
              <li className="flex items-center gap-3">
                <span>
                  <TbClockPause className="text-xl text-secondary" />
                </span>
                <h3 className="text-[14px] leading-4 font-[300]">
                  <strong>Hours: </strong>
                  <span>{settingData?.data[0]?.start_close}</span>
                </h3>
              </li>
            </ul>
          </div>
          {/* ------ company address section ------ end */}
        </div>
        {/* ------ footer top section ------ end */}

        {/* ------ footer bottom ------ start */}
        <div className="border-t mt-5 border-bgray-400 flex flex-col md:flex-row justify-between items-center pt-5 gap-3 pb-20 lg:pb-5">
          <p className="text-[14px] text-center md:text-left leading-5 font-[200]">
            © {new Date().getFullYear()} {settingData?.data[0]?.title} <br />{" "}
            All right reserved
          </p>
          <div className="flex flex-col items-center">
            <nav className="flex justify-center gap-x-1 md:pb-0">
              <p className="mt-1">Follow us: </p>
              <a
                href={settingData?.data[0]?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-8 h-8 rounded-full bg-[#4267B2] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                  <FaFacebookF className="text-[#ffffff] transition-all duration-500" />
                </span>
              </a>
              <a
                href={settingData?.data[0]?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-8 h-8 rounded-full bg-[#1DA1F2] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                  <FaTwitter className="text-[#ffffff] transition-all duration-500" />
                </span>
              </a>
              <a
                href={settingData?.data[0]?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-8 h-8 rounded-full bg-[#cd486b] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                  <FaInstagram className="text-[#ffffff] transition-all duration-500" />
                </span>
              </a>
              <a
                href={settingData?.data[0]?.you_tube}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-8 h-8 rounded-full bg-[#c4302b] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                  <FaYoutube className="text-[#ffffff] transition-all duration-500" />
                </span>
              </a>
              <a
                href={settingData?.data[0]?.watsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="w-8 h-8 rounded-full bg-[#25D366] transition-all duration-500 flex items-center justify-center group-hover:-translate-y-1">
                  <FaWhatsapp className="text-[#ffffff] transition-all duration-500" />
                </span>
              </a>
            </nav>
            <div className="text-[15px] text-center md:text-left leading-7 font-[200]">
              <strong>Developed by:</strong>{" "}
              <Link
                target="_blank"
                href={`https://classicit.com.bd`}
                className="text-[#f4f6f8] hover:text-blue-500 underline"
              >
                Classic IT & Sky Mart Ltd.
              </Link>{" "}
            </div>
          </div>
          <div>
            <Image
              src={paymentIcon}
              alt="payment method icon"
              width={200}
              height={150}
              className="object-fill"
              loading="lazy"
            />
          </div>
        </div>
        {/* ------ footer bottom ------ end */}
      </div>
    </section>
  );
};

export default Footer;
