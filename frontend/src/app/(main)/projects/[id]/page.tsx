import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

const Project = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const project = await getProject(id).catch(() => undefined);

    if (!project) {
        return notFound();
    }

    return <div>{project.name}</div>;
};

export default Project;
