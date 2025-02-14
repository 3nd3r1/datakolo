import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

const Repositories = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;
    const project = await getProject(projectId).catch(() => undefined);

    if (!project) {
        notFound();
    }

    return <div></div>;
};

export default Repositories;
