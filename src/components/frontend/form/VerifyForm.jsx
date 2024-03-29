"use client";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import {
  useResendOtpMutation,
  useVerifyMutation,
} from "@/redux/feature/auth/authApi";
import { useRouter } from "next/navigation";

const VerifyForm = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const { handleSubmit, reset } = useForm();
  const router = useRouter();

  const [verify, { isLoading }] = useVerifyMutation();
  const [resendOtp] = useResendOtpMutation();

  const handleVerify = async () => {
    try {
      setLoading(true);
      const otp = OTPinput.join("");
      const data = {
        user_phone: phone,
        user_otp: otp,
      };
      const res = await verify(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message, {
          autoClose: 1,
        });
        router.push("/signin");
        reset();
      } else if (res?.error?.status === 400) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("otp verified error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      if (disable) return;
      const data = {
        user_phone: phone,
      };
      const res = await resendOtp(data);
      if (res?.data?.data?.success) {
        setDisable(true);
        toast.info(res?.data?.data?.message);
        setTimer(60);
      }
    } catch (error) {
      console.error("resend otp error", error);
    }
  };

  const handleInputChange = (index, value) => {
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);

    // Automatically move to the next input field if the current field is not the last one
    if (index < newOTPinput.length - 1 && value !== "") {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  const handleInputKeyDown = (index, e) => {
    // Move to the previous input field on backspace if the current field is empty
    if (e.key === "Backspace" && index > 0 && OTPinput[index] === "") {
      document.getElementById(`otpInput-${index - 1}`).focus();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  useEffect(() => {
    const phone = JSON.parse(localStorage.getItem("user"));
    if (phone) {
      setPhone(phone);
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="px-6 pt-10 pb-9 shadow mx-auto w-full rounded-md">
        <div className="mx-auto flex flex-col space-y-3">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <h4 className="text-primary font-medium mb-0">
              Verify your account
            </h4>
            <p>We have sent a code to your Phone Number {phone}</p>
          </div>

          <form onSubmit={handleSubmit(handleVerify)}>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      maxLength="1"
                      id={`otpInput-${index}`}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleInputKeyDown(index, e)}
                    ></input>
                  </div>
                ))}
              </div>
              <div>
                <button className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-primary border-none text-white text-sm shadow-sm">
                  {loading || isLoading ? <MiniSpinner /> : "Verify Account"}
                </button>
              </div>
            </div>
          </form>
          <div className="flex flex-col space-y-5 max-w-xs mx-auto">
            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p className="mb-0">Did not receive code?</p>{" "}
              <button
                className={`${
                  disable
                    ? "text-gray-500 cursor-not-allowed"
                    : "cursor-pointer underline"
                }`}
                onClick={() => handleResend()}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
