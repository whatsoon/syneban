import IconButton from "../Buttons/IconButton";

export default function BottomSheet({
  title,
  children,
  open = false,
  onClose,
}: {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  const sheetStyle = `w-full fixed left-0 bottom-0 z-40 flex flex-col origin-top-left transition-transform ${
    open ? "transform-none" : "translate-y-full"
  }`;
  const contentStyle =
    "block p-4 max-h-60 w-full mx-auto rounded-t-2xl bg-slate-100 md:max-w-screen-md overflow-y-auto";
  const overlayStyle = "fixed left-0 top-0 z-30 h-screen w-screen bg-black/50";

  return (
    <>
      <div className={sheetStyle}>
        <div className={contentStyle}>
          <div className="flex items-center justify-between">
            <div className="grow">
              {title && <span className="font-bold">{title}</span>}
            </div>
            <IconButton icon="close" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
      {open ? <div className={overlayStyle} onClick={onClose}></div> : null}
    </>
  );
}
