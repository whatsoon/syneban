import { ChangeEventHandler, useRef } from "react";
import { SelectOption } from "@/types/components";

export default function SelectField({
  className = "",
  title = "",
  value = "",
  options = [],
  onChange,
}: {
  className?: string;
  title?: string;
  value?: string | number | readonly string[];
  options?: SelectOption[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className={className}>
      {title && <div className="px-2 pb-1 text-xs text-gray-600">{title}</div>}
      <div
        className={`flex h-12 w-full items-stretch justify-center rounded border border-stone-200 px-3 transition-all focus-within:ring`}
        onClick={() => selectRef.current?.focus()}
      >
        <select
          ref={selectRef}
          className="h-full w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        >
          {options.map(({ key, value, text }) => (
            <option key={key} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
