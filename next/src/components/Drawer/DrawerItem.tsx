import Icon from "../Icon";

export default function DrawerItem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: string;
  onClick?: () => void;
}) {
  const itemClass = "flex gap-x-3 items-center select-none w-full px-4 py-4";
  const content = (
    <>
      {icon && <Icon icon={icon} />}
      <span>{text}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        className={`${itemClass} rounded-full transition-colors active:bg-black/20 lg:hover:bg-black/10`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  } else {
    return <div className={`${itemClass} font-medium`}>{content}</div>;
  }
}
