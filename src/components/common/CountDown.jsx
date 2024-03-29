"use client";
import { useEffect, useState } from "react";
import moment from "moment";

const Countdown = ({ startDate, endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    const isAfterStart = now.isAfter(start);
    const isBeforeEnd = now.isBefore(end);

    if (isAfterStart && isBeforeEnd) {
      const duration = moment.duration(end.diff(now));
      return {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };
    }

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return (
    <div className="relative text-center w-[250px] mx-auto border pt-4 rounded-full">
      <div className="absolute -top-3 bg-white w-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="uppercase mb-0 font-medium">Ending in</p>
      </div>
      <div className="text-lg font-normal flex gap-2 justify-center">
        <p className="mb-0">
          <span className="bg-secondary text-textColor w-[43px] block rounded">
            {timeRemaining.days}
          </span>
          <span className="text-[10px] my-[3px] block">days</span>
        </p>
        <p className="mb-0">
          <span className="bg-secondary text-textColor w-[43px] block rounded">
            {timeRemaining.hours}
          </span>
          <span className="text-[10px] my-[3px] block">Hours</span>
        </p>
        <p className="mb-0">
          <span className="bg-secondary text-textColor w-[43px] block rounded">
            {timeRemaining.minutes}
          </span>
          <span className="text-[10px] my-[3px] block">Minutes</span>
        </p>
        <p className="mb-0">
          <span className="bg-secondary text-textColor w-[43px] block rounded">
            {timeRemaining.seconds}
          </span>
          <span className="text-[10px] my-[3px] block">Seconds</span>
        </p>
      </div>
    </div>
  );
};

export default Countdown;
