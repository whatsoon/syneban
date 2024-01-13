import Drawer from "./Drawer/Drawer";
import TopAppBar from "./TopAppBar/TopAppBar";

export default function Main({
  children,
  padded = false,
}: {
  children?: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <main className="flex h-full w-full flex-col">
      <Drawer />
      <TopAppBar />
      <div className={"flex-auto overflow-auto" + (padded ? " p-2" : "")}>
        {children}
      </div>
    </main>
  );
}
