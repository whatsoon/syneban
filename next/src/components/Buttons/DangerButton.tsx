import { MouseEventHandler } from "react";

export default function DangerButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="h-10 rounded-full border-none bg-rose-600 px-6 text-white transition-colors active:bg-rose-800 lg:hover:bg-rose-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
