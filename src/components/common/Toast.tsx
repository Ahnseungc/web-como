"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const Toast = ({ message, type = "info" }: ToastProps) => {
  const getIcon = () => {
    const iconBaseClasses =
      "w-12 h-12 rounded-full flex items-center justify-center text-gray-0 text-xl font-bold";
    switch (type) {
      case "success":
        return <div className={cn(iconBaseClasses, "bg-brand-orange")}>✓</div>;
      case "error":
        return <div className={cn(iconBaseClasses, "bg-point-red")}>✕</div>;
      case "warning":
        return <div className={cn(iconBaseClasses, "bg-orange-500")}>⚠</div>;
      default:
        return <div className={cn(iconBaseClasses, "bg-point-blue")}>ℹ</div>;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "flex items-center gap-4 rounded-full bg-gray-900/90 px-5 py-3 text-gray-50 shadow-xl backdrop-blur-sm"
      )}
    >
      {getIcon()}
      <span className="text-xl font-medium">{message}</span>
    </motion.div>
  );
};

export default Toast;
