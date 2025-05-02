import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

const Project = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;

    const result = await getProject(projectId);
    if (!result.success) {
        return notFound();
    }
    const project = result.data;

    return <div>{project.name}</div>;
};

export default Project;
