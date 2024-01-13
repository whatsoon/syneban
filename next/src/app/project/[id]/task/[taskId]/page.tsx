import { notFound } from "next/navigation";
import { LocalProjectProvider } from "@/contexts/LocalProject/localProjectContext";
import { LocalTaskPage } from "./localTaskPage";
import { validateId } from "@/utils/project";
import { TaskPage } from "./taskPage";

export default function TaskDetails({
  params,
}: {
  params: { id: string; taskId: string };
}) {
  const nTaskId = Number(params.taskId);
  const validTaskId = Number.isInteger(nTaskId);
  if (!validTaskId) notFound();

  if (params.id === "local")
    return (
      <LocalProjectProvider>
        <LocalTaskPage taskId={nTaskId} />
      </LocalProjectProvider>
    );

  const id = validateId(params.id);
  const taskId = validateId(params.taskId);
  if (!id || !taskId) notFound();

  return <TaskPage projectId={id} taskId={taskId} />;
}
