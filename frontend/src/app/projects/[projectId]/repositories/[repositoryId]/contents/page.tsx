import { notFound } from "next/navigation";
import { getProject } from "@/lib/project";
import { getRepository } from "@/lib/repository";

const Contents = async ({
    params,
}: {
    params: Promise<{ projectId: string; repositoryId: string }>;
}) => {
    const { projectId, repositoryId } = await params;

    const project = await getProject(projectId).catch(() => undefined);
    const repository = await getRepository(projectId, repositoryId).catch(
        () => undefined
    );

    if (!project || !repository) {
        return notFound();
    }

    return <div></div>;
};

export default Contents;
