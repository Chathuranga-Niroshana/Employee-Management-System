import React, { useState, useEffect } from "react";
import './DarkModeToggle.css'

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
    } else {
      setIsDarkMode(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode); // Add or remove dark-mode class from body
      return newMode;
    });
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
