export default function ItemContent({
  clickable,
  children,
}: {
  clickable?: boolean;
  children?: React.ReactNode;
}) {
  const clickableClass = clickable
    ? "active:bg-black/10 lg:hover:bg-black/5"
    : "";
  const className =
    "flex flex-row justify-between grow h-20 items-center px-6 " +
    clickableClass;

  return <div className={className}>{children}</div>;
}
