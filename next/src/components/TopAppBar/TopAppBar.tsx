import Link from "next/link";
import MenuButton from "./MenuButton";
import { SiteName } from "@/utils/utils";

export default function TopAppBar() {
  return (
    <header>
      <div className="flex h-16 items-center justify-start gap-2 bg-teal-700 px-1 text-white">
        <MenuButton />
        <Link className="select-none text-xl" href={"/"}>
          <span>{SiteName}</span>
        </Link>
      </div>
    </header>
  );
}
