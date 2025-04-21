import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";
import { getRepositories } from "@/lib/repository";

import ProjectApiBuilder from "@/components/projects/api-builder/project-api-builder";

const ApiBuilder = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;
    const project = await getProject(projectId).catch(() => undefined);

    if (!project) {
        return notFound();
    }

    const repositories = await getRepositories(projectId).catch(() => []);

    return <ProjectApiBuilder repositories={repositories} />;
};

export default ApiBuilder;
