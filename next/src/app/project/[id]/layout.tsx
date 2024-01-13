import Main from "@/components/Main";
import { validateId, prependedTitle } from "@/utils/project";
import { getBoardTitle } from "@/utils/projectServerRequests";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.id === "local") {
    return {
      title: prependedTitle("Local"),
    };
  }

  const metadata: Metadata = {};
  const validId = validateId(params.id);
  if (!validId) notFound();

  const title = await getBoardTitle(validId);
  if (!title) notFound();

  metadata.title = prependedTitle(title);
  return metadata;
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Main padded>{children}</Main>;
}
