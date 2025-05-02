import { Repository } from "@/validators/repository";

import { getRepositories } from "@/lib/repository";

import ProjectApiBuilder from "@/components/projects/api-builder/project-api-builder";

const ApiBuilder = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;

    let repositories: Repository[] = [];
    const result = await getRepositories(projectId);
    if (result.success) {
        repositories = result.data;
    }

    return <ProjectApiBuilder repositories={repositories} />;
};

export default ApiBuilder;
