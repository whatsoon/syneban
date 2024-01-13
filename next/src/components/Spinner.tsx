export default function Spinner({
  textColorClass = "text-teal-600",
}: {
  textColorClass?: string;
}) {
  return (
    <div
      className={`flex min-h-full w-full items-center justify-center ${textColorClass}`}
    >
      <svg
        className="animate-spin"
        width="48"
        height="48"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="animate-spinner"
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
