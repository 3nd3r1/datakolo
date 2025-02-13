import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";
import { getRepository } from "@/lib/repository";

import SchemaView from "@/components/projects/repositories/schema-view";

const Repository = async ({
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

    return (
        <div>
            <h3 className="text-xl">{repository.name}</h3>
            <div>
                <SchemaView repository={repository} />
            </div>
        </div>
    );
};

export default Repository;
