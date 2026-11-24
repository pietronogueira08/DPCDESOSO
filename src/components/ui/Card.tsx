import type { HTMLAttributes, ReactNode } from "react";

type CardTone = "default" | "cream" | "mint" | "blush" | "lavender" | "danger";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: CardTone;
  padded?: boolean;
}

const TONE_STYLES: Record<CardTone, string> = {
  default: "bg-surface border-border-warm shadow-cozy",
  cream: "bg-cream border-border-warm shadow-cozy",
  mint: "bg-mint-soft/45 border-mint/25 shadow-cozy",
  blush: "bg-blush-soft/45 border-blush/25 shadow-cozy",
  lavender: "bg-lavender-soft/45 border-lavender/25 shadow-cozy",
  danger: "bg-danger-soft/50 border-danger/25 shadow-cozy",
};

export function Card({
  children,
  tone = "default",
  padded = true,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-3xl border ${TONE_STYLES[tone]} ${
        padded ? "p-5 sm:p-6" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
