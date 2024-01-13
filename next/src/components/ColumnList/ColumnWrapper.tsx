export default function ColumnWrapper({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const wrapperClassName = `basis-80 flex-shrink-0 h-fit rounded border border-teal-600 ${
    className || ""
  }`;

  return <div className={wrapperClassName.trim()}>{children}</div>;
}
