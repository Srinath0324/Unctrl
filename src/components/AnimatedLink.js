"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Global control values (change here for ALL links)
const SCRAMBLE_SPEED = 60; // ms between scrambles
const COLOR_SPEED = 0.5;     // seconds for orange → yellow → white cycle
const SCRAMBLE_STEPS = 3;  // how many times it jumbles before resetting

export const AnimatedLink = ({ value }) => {
  const [displayText, setDisplayText] = useState(value);
  const [isHovered, setIsHovered] = useState(false);

  // Function to jumble letters randomly
  const jumbleText = (text) => {
    return text
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  useEffect(() => {
    let interval;
    if (isHovered) {
      let steps = 0;
      interval = setInterval(() => {
        if (steps < SCRAMBLE_STEPS) {
          setDisplayText(jumbleText(value));
        } else {
          setDisplayText(value); // restore original
          clearInterval(interval);
        }
        steps++;
      }, SCRAMBLE_SPEED);
    } else {
      setDisplayText(value);
    }
    return () => clearInterval(interval);
  }, [isHovered, value]);

  return (
    <motion.span
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        color: isHovered
          ? ["#FFA500", "#FFFF00", "#FFFFFF"] // animate once
          : "#FFFFFF",                        // reset
      }}
      transition={{
        duration: COLOR_SPEED,
        repeat: 0, // <-- play once, no loop
      }}
    >
      {displayText}
    </motion.span>
  );
};
