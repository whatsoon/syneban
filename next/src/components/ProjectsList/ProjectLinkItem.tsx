import Link from "next/link";
import ItemContent from "./ItemContent";
import IconButton from "../Buttons/IconButton";
import { useState } from "react";
import ConfirmDialog from "../Dialog/ConfirmDialog";

export default function ProjectLinkItem({
  title,
  subtitle,
  href,
  onDelete,
}: {
  title: string;
  subtitle?: string;
  href: string;
  onDelete?: () => void;
}) {
  const [confirmDialog, setConfirmDialog] = useState(false);
  function showDialog(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!onDelete) return;
    setConfirmDialog(true);
  }
  return (
    <>
      <Link className="grow text-left" href={href}>
        <ItemContent clickable>
          <div>
            <div>{title}</div>
            {subtitle && (
              <div className="text-xs text-gray-600">{subtitle}</div>
            )}
          </div>
          {onDelete && <IconButton icon="delete" onClick={showDialog} />}
        </ItemContent>
      </Link>
      {confirmDialog && onDelete && (
        <ConfirmDialog
          danger
          title="Delete project"
          message={`Are you sure you want to delete project: ${title}?`}
          onConfirm={onDelete}
          onCancel={() => setConfirmDialog(false)}
        />
      )}
    </>
  );
}
