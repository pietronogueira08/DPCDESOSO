"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SPRING_BOUNCY, useSafeMotion } from "@/lib/motion";

export interface PillTabItem<T extends string> {
  readonly id: T;
  readonly label: string;
  readonly shortLabel?: string;
  readonly badge?: string;
  readonly icon?: React.ReactNode;
}

interface SectionPillTabsProps<T extends string> {
  tabs: readonly PillTabItem<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  layoutId?: string;
  ariaLabel?: string;
}

export function SectionPillTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  layoutId = "fisio-main-tab-pill",
  ariaLabel = "Navegação principal de estudo",
}: SectionPillTabsProps<T>) {
  const { shouldReduceMotion } = useSafeMotion();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const nextIndex =
      e.key === "ArrowRight"
        ? (idx + 1) % tabs.length
        : (idx - 1 + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    if (nextTab) {
      onChange(nextTab.id);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="grid grid-cols-2 gap-1.5 rounded-3xl border border-border-warm bg-surface/95 p-1.5 shadow-kawaii sm:inline-flex sm:w-full sm:flex-wrap sm:justify-between md:grid md:grid-cols-4"
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            role="tab"
            type="button"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`relative flex min-h-[44px] items-center justify-center gap-1.5 rounded-2xl px-2.5 py-2 text-xs font-display font-bold transition-colors sm:px-3.5 sm:text-sm ${
              isActive ? "text-ink" : "text-ink-secondary hover:text-ink"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={shouldReduceMotion ? undefined : layoutId}
                transition={SPRING_BOUNCY}
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl border border-[#FBCFE8] bg-gradient-to-r from-[#FCE7F3]/80 via-[#FFFDF9] to-[#D1FAE5]/70 shadow-sm"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 truncate">
              {tab.icon}
              <span className="truncate sm:hidden">{tab.shortLabel ?? tab.label}</span>
              <span className="hidden truncate sm:inline">{tab.label}</span>
              {tab.badge && (
                <span className="hidden rounded-full bg-surface/90 px-1.5 py-0.5 text-[10px] font-bold text-ink-secondary border border-border-warm lg:inline-block">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
