"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { SPRING_BOUNCY, useSafeMotion } from "@/lib/motion";

export type ButtonVariant = "mint" | "sky" | "berry" | "rose" | "soft" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface SpringButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  mint: "bg-mint text-white hover:bg-mint-ink shadow-sm",
  sky: "bg-sky-med text-white hover:bg-sky-med-ink shadow-sm",
  berry: "bg-berry text-white hover:bg-berry-ink shadow-sm",
  rose: "bg-rose-mimo text-white hover:bg-rose-mimo-ink shadow-sm",
  soft: "bg-surface text-ink border border-border-warm hover:bg-cream shadow-sm",
  ghost: "bg-transparent text-ink-secondary hover:bg-cream hover:text-ink",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-xl min-h-[34px]",
  md: "px-4 py-2.5 text-sm rounded-2xl min-h-[42px]",
  lg: "px-5 py-3 text-base rounded-2xl min-h-[48px]",
};

export function SpringButton({
  children,
  variant = "soft",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ...rest
}: SpringButtonProps) {
  const { shouldReduceMotion } = useSafeMotion();

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={shouldReduceMotion || disabled ? undefined : { scale: 1.025, y: -1 }}
      whileTap={shouldReduceMotion || disabled ? undefined : { scale: 0.965 }}
      transition={SPRING_BOUNCY}
      className={`inline-flex items-center justify-center gap-2 font-display font-bold transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
