"use client";

import BottomSheet from "@/components/BottomSheet/BottomSheet";
import ColumnLayout from "@/components/BottomSheet/ColumnLayout";
import TaskLayout from "@/components/BottomSheet/TaskLayout";
import ColumnList from "@/components/ColumnList/ColumnList";
import Spinner from "@/components/Spinner";
import { Project } from "@/types/project";
import { sortByOrd, taskEditRoute } from "@/utils/project";
import { useState } from "react";

interface ProjectPageLayoutProps {
  project: Project | undefined;
  createColumn: (title: string) => void;
  updateColumnTitle: (columnId: number, title: string) => void;
  swapColumn: (columnId: number, direction: "left" | "right") => void;
  deleteColumn: (columnId: number) => void;
  createTask: (title: string, columnId: number) => void;
  deleteTask: (taskId: number) => void;
  swapTask: (taskId: number, direction: "up" | "down") => void;
}

export default function ProjectPageLayout({
  project,
  createColumn,
  updateColumnTitle,
  swapColumn,
  deleteColumn,
  createTask,
  deleteTask,
  swapTask,
}: ProjectPageLayoutProps) {
  const [bottomLayout, setBottomLayout] = useState<
    "task" | "column" | undefined
  >(undefined);
  const [columnId, setColumnId] = useState<number | undefined>(undefined);

  if (project === undefined) {
    return <Spinner />;
  }

  function columnCallback(title: string) {
    createColumn(title);
    setBottomLayout(undefined);
  }

  function taskCallback(title: string, colId: number) {
    createTask(title, colId);
    setBottomLayout(undefined);
  }

  const onNewTask = (colId: number) => {
    setColumnId(colId);
    setBottomLayout("task");
  };

  return (
    <>
      <ColumnList
        list={[...project.columns].sort(sortByOrd)}
        onNewColumn={() => setBottomLayout("column")}
        onNewTask={onNewTask}
        onDeleteColumn={deleteColumn}
        onSwap={swapColumn}
        getTaskEditRoute={(taskId) => taskEditRoute(project.id, taskId)}
        onTaskDelete={deleteTask}
        onTaskSwap={swapTask}
        onUpdateColumnTitle={updateColumnTitle}
      />
      <BottomSheet
        title={bottomLayout === "column" ? "New Column" : "New Task"}
        open={Boolean(bottomLayout)}
        onClose={() => setBottomLayout(undefined)}
      >
        <BottomContent
          layout={bottomLayout}
          columnCallback={columnCallback}
          columnId={columnId}
          taskCallback={taskCallback}
        />
      </BottomSheet>
    </>
  );
}

function BottomContent({
  layout,
  columnCallback,
  columnId,
  taskCallback,
}: {
  layout: "column" | "task" | undefined;
  columnCallback?: (title: string) => void;
  columnId?: number;
  taskCallback?: (title: string, columnId: number) => void;
}) {
  if (layout === "column" && columnCallback) {
    return <ColumnLayout callback={columnCallback} />;
  } else if (layout === "task" && taskCallback && columnId !== undefined) {
    return <TaskLayout columnId={columnId} callback={taskCallback} />;
  } else {
    return null;
  }
}
