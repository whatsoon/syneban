import { MouseEventHandler } from "react";
import Icon from "../Icon";
import ColumnWrapper from "./ColumnWrapper";

export default function NewColumnItem({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <ColumnWrapper className="border-dashed">
      <button
        onClick={onClick}
        className="flex w-full flex-col items-center justify-center py-2 text-teal-800 opacity-40 hover:opacity-100 active:opacity-100"
      >
        <Icon icon="add" />
        <div>New Column</div>
      </button>
    </ColumnWrapper>
  );
}
