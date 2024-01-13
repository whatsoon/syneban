import Icon from "./Icon";

export function FAB({ icon, onClick }: { icon: string; onClick: () => void }) {
  return (
    <div className="absolute bottom-10 right-8">
      <button
        onClick={onClick}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 p-4 text-white transition-colors active:bg-teal-800 lg:hover:bg-teal-700"
      >
        <Icon icon={icon} />
      </button>
    </div>
  );
}
