import { MouseEventHandler } from "react";

export default function SecondaryButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="h-10 rounded-full border-none bg-slate-600 px-6 text-white transition-colors active:bg-slate-800 lg:hover:bg-slate-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
