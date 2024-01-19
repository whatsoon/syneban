import Main from "@/components/Main";
import { validateId, prependedTitle } from "@/utils/project";
import { getBoardTitle } from "@/utils/projectServerRequests";
import { Metadata } from "next";

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
  if (!validId) return metadata;

  const title = await getBoardTitle(validId);
  if (!title) return metadata;

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
