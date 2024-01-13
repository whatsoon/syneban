import Link from "next/link";
import { MouseEventHandler } from "react";
import Icon from "../Icon";

export default function IconButton({
  icon,
  href,
  size = 2,
  onClick,
}: {
  icon: string;
  href?: string;
  size?: 0 | 1 | 2;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const sizeClass = (() => {
    switch (size) {
      case 0:
        return {
          group: "w-8 h-8",
          icon: "w-6 h-6 text-lg",
        };
      case 1:
        return {
          group: "w-10 h-10",
          icon: "w-8 h-8 text-xl",
        };
      case 2:
        return {
          group: "w-12 h-12",
          icon: "w-10 h-10 text-2xl",
        };
    }
  })();

  const groupStyle = `flex justify-center items-center group ${sizeClass.group}`;
  const iconStyle = `rounded-full ${sizeClass.icon} flex justify-center items-center transition-colors lg:group-hover:bg-black/10 active:bg-black/20`;
  if (href) {
    return (
      <Link href={href} className={groupStyle}>
        <Icon className={iconStyle} icon={icon} />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={groupStyle}>
      <Icon className={iconStyle} icon={icon} />
    </button>
  );
}
