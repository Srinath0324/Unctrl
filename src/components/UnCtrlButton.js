"use client";

import { motion } from "framer-motion";

const UnCtrlButton = ({ children }) => {
  return (
    <motion.button
      className="relative btn-primary font-semibold text-white bg-orange-500 shadow-md transition-all duration-300"
      whileHover={{
        backgroundColor: "#111111",     // dark background on hover
        color: "#FFFFFF",              // white text
        y: -0.5,                         // lift up a little
        boxShadow: "6px 6px 0px #B6FF00", // neon green shadow
      }}
      whileTap={{ scale: 0.97 }} // slight press effect
    >
      {children}
    </motion.button>
  );
};

export default UnCtrlButton;
