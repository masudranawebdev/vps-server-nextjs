"use client";
import Image from "next/image";
import SettingSection from "@/components/frontend/ui/customer/SettingSection";
import AccountSection from "@/components/frontend/ui/customer/AccountSection";

const Profile = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="w-2/12">
        <div className="bg-white flex flex-col shadow-lg pb-10 items-center">
          <h4 className="text-center py-10 text-3xl font-medium text-gray-700">
            Profile
          </h4>
          <div className="rounded-full ring w-[150px] h-[150px] overflow-hidden">
            <Image
              src="/assets/images/logo/profile.png"
              alt="profile"
              width={150}
              height={150}
              className="mt-2 mx-auto"
            />
          </div>
          <h4 className="text-center py-10 text-xl font-medium text-gray-600">
            Admin
          </h4>
        </div>
      </div>
      <div className="flex-1 bg-white p-5">
        <AccountSection />
        <SettingSection />
      </div>
    </div>
  );
};

export default Profile;
