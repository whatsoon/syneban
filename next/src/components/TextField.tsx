"use client";

import { ChangeEventHandler, useRef } from "react";

export default function TextField({
  className = "",
  placeholder = "",
  title = "",
  value = "",
  borderless = false,
  autofocus = false,
  onChange,
  trailingButton,
}: {
  className?: string;
  placeholder?: string;
  title?: string;
  value?: string | number | readonly string[];
  borderless?: boolean;
  autofocus?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  trailingButton?: React.ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const borderStyle = borderless ? "" : "border border-stone-200";

  return (
    <div className={className}>
      {title && <div className="px-2 pb-1 text-xs text-gray-600">{title}</div>}
      <div
        className={`flex items-stretch justify-center rounded px-3 ${borderStyle} h-12 w-full transition-all focus-within:ring`}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          className="h-full w-full bg-transparent outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autofocus}
        />
        {trailingButton && trailingButton}
      </div>
    </div>
  );
}
