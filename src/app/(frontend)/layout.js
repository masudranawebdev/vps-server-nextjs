import Link from "next/link";
import Footer from "@/shared/Footer";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import MainNavbar from "@/shared/MainNavbar";
import { getMenuData } from "@/lib/getMenuData";
import Sticky from "@/components/frontend/ui/sticky/Sticky";

export const metadata = {
  title: {
    default: "Home",
    template: "%s - Janani Computer",
  },
  description: "Generated by Masud Rana",
};

export default async function MainLayout({ children }) {
  const menuData = await getMenuData();
  return (
    <div>
      <div className="hidden lg:block py-1.5 border-b border-gray-500 bg-primary">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="mt-3">
            <strong className="text-white">Need Help? Call Us: </strong>
            <span className="text-secondary">
              <TfiHeadphoneAlt className="inline ml-2" /> +8801796682951
            </span>
          </p>
          <div className="flex items-center gap-3">
            <Link href={`/offer`}>
              <span className="text-textColor hover:text-secondary transition-colors duration-200 ease-in font-normal text-sm inline-block">
                Offer
              </span>
            </Link>
            <span className="h-4 w-[2px] inline-block bg-gray-300"></span>
            <Link href={`/flash-sale`}>
              <span className="text-textColor hover:text-secondary transition-colors duration-200 ease-in font-normal text-sm inline-block">
                Flash Sale
              </span>
            </Link>
            <span className="h-4 w-[2px] inline-block bg-gray-300"></span>
            <Link href={`/order-tracking`}>
              <span className="text-textColor hover:text-secondary transition-colors duration-200 ease-in font-normal text-sm inline-block">
                Order Tracking
              </span>
            </Link>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-30">
        <MainNavbar menuData={menuData} />
      </header>
      <div className="min-h-screen">{children}</div>
      <footer>
        <Footer />
      </footer>
      <div className="text-textColor fixed bottom-16 left-1 z-20 block lg:hidden">
        <Sticky />
      </div>
    </div>
  );
}