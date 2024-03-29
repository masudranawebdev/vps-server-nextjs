"use client";
import { useState, useEffect } from "react";
import {
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
    });

    Events.scrollEvent.register("end", function () {
    });

    scrollSpy.update();

    window.addEventListener("scroll", handleScroll);

    return function cleanup() {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 2000,
      smooth: true,
    });
  };

  return (
    <div
      className={`fixed bottom-14 lg:bottom-2 right-2 flex items-center justify-center animate-bounce ${
        isVisible ? "visible" : "invisible"
      }`}
    >
      <button onClick={handleScrollToTop}>
        <FaArrowUp className="text-4xl p-2 bg-secondary text-textColor rounded" />
      </button>
    </div>
  );
};

export default ScrollToTop;
