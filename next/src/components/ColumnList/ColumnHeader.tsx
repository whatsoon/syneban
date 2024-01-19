import { MouseEventHandler, useEffect, useState } from "react";
import IconButton from "../Buttons/IconButton";
import TextField from "../TextField";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function ColumnHeader({
  title,
  onNewTask,
  onDelete,
  onSwapLeft,
  onSwapRight,
  onUpdateTitle,
}: {
  title: string;
  onNewTask: MouseEventHandler<HTMLButtonElement>;
  onDelete: () => void;
  onSwapLeft: MouseEventHandler<HTMLButtonElement>;
  onSwapRight: MouseEventHandler<HTMLButtonElement>;
  onUpdateTitle: (title: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [confirmDialog, setConfirmDialog] = useState(false);

  useEffect(() => {
    setUpdatedTitle(title);
  }, [title]);

  function updateTitle(e: React.FormEvent) {
    e.preventDefault();
    onUpdateTitle(updatedTitle);
    setEditMode(false);
  }

  if (editMode) {
    return (
      <form
        onSubmit={updateTitle}
        className="flex items-center justify-between bg-teal-600 text-white"
      >
        <TextField
          className="grow"
          borderless
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          autofocus
          trailingButton={<IconButton icon="check" onClick={updateTitle} />}
        />
      </form>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between bg-teal-600 text-white">
        <IconButton icon="switch_left" onClick={onSwapLeft} />
        <IconButton icon="add" onClick={onNewTask} />
        <div className="grow overflow-hidden">
          <span className="line-clamp-2">{title}</span>
        </div>
        <IconButton icon="edit" onClick={() => setEditMode(!editMode)} />
        <IconButton icon="delete" onClick={() => setConfirmDialog(true)} />
        <IconButton icon="switch_right" onClick={onSwapRight} />
      </div>
      {confirmDialog && (
        <ConfirmDialog
          danger
          title="Delete Column"
          message={`Are you sure you want to delete column: ${title}?`}
          onConfirm={onDelete}
          onCancel={() => setConfirmDialog(false)}
        />
      )}
    </>
  );
}
