import { getContent } from "@/lib/content";
import { notFound } from "next/navigation";

const Content = async ({
    params,
}: {
    params: Promise<{
        projectId: string;
        repositoryId: string;
        contentId: string;
    }>;
}) => {
    const { projectId, repositoryId, contentId } = await params;

    const content = await getContent(projectId, repositoryId, contentId);

    if (!content) {
        return notFound();
    }

    return <div>{content.id}</div>;
};

export default Content;
