import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";

import ProjectSettings from "@/components/projects/settings/project-settings";

const Settings = async ({
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

    return <ProjectSettings project={project} />;
};

export default Settings;
