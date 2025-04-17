import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

import ProjectSettings from "@/components/projects/settings/project-settings";

const Settings = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;
    const project = await getProject(projectId).catch(() => undefined);

    if (!project) {
        return notFound();
    }

    return <ProjectSettings project={project} />;
};

export default Settings;
