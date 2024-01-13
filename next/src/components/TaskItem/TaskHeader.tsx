import { useState } from "react";
import IconButton from "../Buttons/IconButton";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function TaskHeader({
  title,
  editLink,
  onDelete,
  onSwapUp,
  onSwapDown,
}: {
  title: string;
  editLink: string;
  onDelete: () => void;
  onSwapUp: () => void;
  onSwapDown: () => void;
}) {
  const [confirmDialog, setConfirmDialog] = useState(false);
  return (
    <>
      <div className="flex min-h-24 items-stretch justify-between bg-teal-600 text-white">
        <div className="flex flex-col justify-between">
          <IconButton
            size={0}
            icon="keyboard_arrow_up"
            onClick={() => onSwapUp()}
          />
          <IconButton
            size={0}
            icon="keyboard_arrow_down"
            onClick={() => onSwapDown()}
          />
        </div>
        <div className="flex grow items-center justify-start overflow-hidden">
          <span className="line-clamp-2">{title}</span>
        </div>
        <div className="flex flex-col justify-between">
          <IconButton size={0} icon="edit" href={editLink} />
          <IconButton
            size={0}
            icon="delete"
            onClick={() => setConfirmDialog(true)}
          />
        </div>
      </div>
      {confirmDialog && (
        <ConfirmDialog
          danger
          title="Delete Task"
          message={`Are you sure you want to delete task: ${title}?`}
          onConfirm={onDelete}
          onCancel={() => setConfirmDialog(false)}
        />
      )}
    </>
  );
}
