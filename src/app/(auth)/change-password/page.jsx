import Image from "next/image";
import ChangePasswordForm from "../../../components/frontend/form/ChangePasswordForm";
import Link from "next/link";

export const metadata = {
  title: "Change Password",
  description: "Generated by Masud Rana",
  authors: {
    name: "Masud Rana",
    url: "https://www.facebook.com/masudranawebdev",
  },
};

const ChangePasswordPage = () => {
  return (
    <div className="relative py-8 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          width={500}
          height={500}
          src="/assets/images/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div
        style={{ backgroundPosition: "center", backgroundSize: "cover" }}
        className="absolute top-0 left-0 right-0 bottom-0 -z-[1px] w-[100%] h-[100%] bg-[url(/assets/images/auth/map.png)] px-6 sm:px-16 object-cover min-h-screen"
      ></div>
      <Image
        width={500}
        height={500}
        src="/assets/images/auth/coming-soon-object1.png"
        alt="image"
        className="absolute left-0 top-1/2 h-full lg:max-h-screen -translate-y-1/2"
        loading="lazy"
      />
      <Image
        width={500}
        height={500}
        src="/assets/images/auth/coming-soon-object2.png"
        alt="image"
        className="absolute top-0 h-40 md:left-[30%]"
        loading="lazy"
      />
      <Image
        width={500}
        height={500}
        src="/assets/images/auth/coming-soon-object3.png"
        alt="image"
        className="absolute right-0 top-0 h-[300px]"
        loading="lazy"
      />
      <Image
        width={500}
        height={500}
        src="/assets/images/auth/polygon-object.svg"
        alt="image"
        className="absolute bottom-0 end-[28%]"
        loading="lazy"
      />

      <div className="flex items-center justify-center h-full w-full px-5 md:px-0">
        <div className="w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] shadow-xl">
          <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 backdrop-blur-lg">
            <div className="mx-auto w-full max-w-[440px] py-10">
              <div className="mb-10">
                <h1 className="text-2xl font-medium uppercase !leading-snug text-primary md:text-3xl">
                  Janani Park
                </h1>
                <p className="text-base font-normal leading-normal text-primaryColor">
                  Enter your password to unlock your ID
                </p>
              </div>
              <ChangePasswordForm />

              <div className="relative my-7 text-center">
                <span className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2 bg-white-light"></span>
                <span className="relative bg-white px-2 font-bold uppercase text-white-dark">
                  or
                </span>
              </div>
              <div className="text-center">
                Instead &nbsp;
                <Link
                  href="/signin"
                  className="uppercase text-primary underline transition hover:text-black"
                >
                  SIGN IN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
