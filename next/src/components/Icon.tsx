export default function Icon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const classes = `material-symbols-rounded select-none ${className || ""}`;
  return <span className={classes}>{icon}</span>;
}
