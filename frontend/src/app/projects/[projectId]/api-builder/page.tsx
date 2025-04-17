import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

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

    return <ProjectApiBuilder />;
};

export default ApiBuilder;
