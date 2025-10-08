"use client";

import { motion } from "framer-motion";

const UnCtrlButton = ({ children }) => {
  return (
<motion.button
  style={{ borderRadius: 0 }}
  className="relative btn-primary font-semibold text-white bg-orange-500 shadow-md transition-all duration-300 unctrlbutton-hover"
  whileHover={{
    backgroundColor: "#111111",
    color: "#FFFFFF",
    y: -0.5,
    boxShadow: "6px 6px 0px #B6FF00",
  }}
  whileTap={{ scale: 0.97 }}
>
  {children}
</motion.button>

  );
};

export default UnCtrlButton;
