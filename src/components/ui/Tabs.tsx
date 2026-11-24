"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";

export interface TabOption<T extends string> {
  id: T;
  label: string;
  badge?: string;
  icon?: ReactNode;
}

interface TabsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (id: T) => void;
  ariaLabel: string;
}

export function Tabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
}: TabsProps<T>) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const targetTab = tabs[nextIndex];
    onChange(targetTab.id);
    const btn = buttonRefs.current[nextIndex];
    if (btn) {
      btn.focus();
      btn.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-nowrap items-center gap-2 overflow-x-auto rounded-2xl border border-border-warm bg-surface p-1.5 shadow-cozy"
    >
      {tabs.map((tab, index) => {
        const isSelected = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            id={`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={(e) => {
              onChange(tab.id);
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex flex-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
              isSelected
                ? "bg-mint-soft/75 text-mint-ink"
                : "text-ink-muted hover:bg-cream hover:text-ink"
            }`}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  isSelected
                    ? "bg-white text-mint-ink"
                    : "bg-cream text-ink-muted"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
