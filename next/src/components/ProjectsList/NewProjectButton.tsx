"use client";

import { fetchCreateBoard } from "@/utils/projectRequests";
import BottomSheet from "../BottomSheet/BottomSheet";
import ProjectLayout from "../BottomSheet/ProjectLayout";
import Icon from "../Icon";
import ItemContent from "./ItemContent";
import { useState } from "react";
import {
  executeWithLoading,
  useAppDispatchContext,
} from "@/contexts/App/appContext";
import { useProjectList } from "@/swr/useProjectList";
import { useUser } from "@/swr/useUser";

export default function NewProjectButton() {
  const { isError, isLoading } = useUser();
  const { mutate } = useProjectList(!isError && !isLoading);
  const [bottomOpen, setBottomOpen] = useState(false);
  const appDispatch = useAppDispatchContext();

  if (isError || isLoading) {
    return null;
  }

  async function onNewProject(title: string) {
    executeWithLoading(appDispatch, async () => {
      const res = await fetchCreateBoard({ title });
      if (res.ok) {
        setBottomOpen(false);
        mutate();
      }
    });
  }

  return (
    <>
      <button onClick={() => setBottomOpen(true)}>
        <ItemContent clickable>
          <div className="flex gap-2">
            <Icon icon="add" />
            <div>New Project</div>
          </div>
        </ItemContent>
      </button>
      <BottomSheet
        title="New Project"
        open={bottomOpen}
        onClose={() => setBottomOpen(false)}
      >
        <ProjectLayout callback={onNewProject} />
      </BottomSheet>
    </>
  );
}
