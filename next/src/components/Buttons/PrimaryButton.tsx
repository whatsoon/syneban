import { MouseEventHandler } from "react";

export default function PrimaryButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="h-10 rounded-full border-none bg-teal-600 px-6 text-white transition-colors active:bg-teal-800 lg:hover:bg-teal-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
