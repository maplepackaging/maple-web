"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out cursor-pointer",
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md",
          variant === "secondary" &&
            "bg-surface text-text-dark border border-border hover:border-primary hover:text-primary",
          variant === "ghost" &&
            "bg-transparent text-text-dark hover:text-primary",
          variant === "outline" &&
            "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
          size === "sm" && "px-4 py-2 text-sm rounded-md",
          size === "md" && "px-6 py-3 text-base rounded-lg",
          size === "lg" && "px-8 py-4 text-lg rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
