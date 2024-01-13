import { createPortal } from "react-dom";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import DangerButton from "../Buttons/DangerButton";

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  danger,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}) {
  function onBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }

  return createPortal(
    <div
      onClick={onBackdropClick}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
    >
      <div className="flex flex-col gap-4 rounded-2xl bg-slate-100 p-6">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-gray-600">{message}</div>
        <div className="flex justify-end gap-4">
          {danger ? (
            <DangerButton text="Confirm" onClick={onConfirm} />
          ) : (
            <PrimaryButton text="Confirm" onClick={onConfirm} />
          )}
          <SecondaryButton text="Cancel" onClick={onCancel} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
