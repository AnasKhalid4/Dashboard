import React, { useState } from "react";
import darkmode from "../assets/darkmode.png";
import { FaMoon } from "react-icons/fa";
import lightmode from "../assets/lightmode.png";
const Darkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <button
      type="button"
      className="flex items-center "
      onClick={toggleDarkMode}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      {isDarkMode ? (
        <img src={lightmode} alt="dark mode " className="h-11 w-20 mr-3" />
      ) : (
        <img src={darkmode} alt="dark mode " className="h-11 w-20 mr-3" />
      )}
    </button>
  );
};

export default Darkmode;
