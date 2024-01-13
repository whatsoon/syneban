import { notFound } from "next/navigation";
import LocalProjectPage from "./localProjectPage";
import { LocalProjectProvider } from "@/contexts/LocalProject/localProjectContext";
import { validateId } from "@/utils/project";
import ProjectPage from "./projectPage";

type Props = {
  params: { id: string };
};

export default function ProjectDetails({ params }: Props) {
  if (params.id === "local")
    return (
      <LocalProjectProvider>
        <LocalProjectPage />
      </LocalProjectProvider>
    );

  const id = validateId(params.id);
  if (!id) notFound();

  return <ProjectPage id={id} />;
}
