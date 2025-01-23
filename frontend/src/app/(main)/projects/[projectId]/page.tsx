import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

const Project = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;

    const project = await getProject(projectId).catch(() => undefined);

    if (!project) {
        return notFound();
    }

    return <div>{project.name}</div>;
};

export default Project;
