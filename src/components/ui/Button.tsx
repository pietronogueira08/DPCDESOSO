import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "mint" | "blush" | "lavender" | "danger" | "soft" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// All button fills guarantee >= 4.5:1 WCAG AA text contrast
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  mint: "bg-mint-deep text-white hover:bg-mint-ink border-transparent shadow-sm",
  blush: "bg-blush text-white hover:bg-blush-deep border-transparent shadow-sm",
  lavender: "bg-lavender text-white hover:bg-lavender-deep border-transparent shadow-sm",
  danger: "bg-danger text-white hover:bg-danger-ink border-transparent shadow-sm",
  soft: "bg-mint-soft text-mint-ink hover:bg-mint-soft/80 border-mint/25",
  outline: "bg-surface text-ink hover:bg-cream border-border-warm",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-[36px] px-3.5 py-1.5 text-xs sm:text-sm rounded-xl",
  md: "min-h-[42px] px-4 py-2 text-sm rounded-2xl",
  lg: "min-h-[48px] px-5 py-2.5 text-base rounded-2xl",
};

export function Button({
  children,
  variant = "mint",
  size = "md",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 border font-semibold transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
