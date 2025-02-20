import { notFound } from "next/navigation";

import { getProject } from "@/lib/project";
import { getRepository } from "@/lib/repository";

import SchemaView from "@/components/projects/repositories/schema-view";
import ContentView from "@/components/projects/repositories/content-view";
import { getContents } from "@/lib/content";

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

    const contents = await getContents(projectId, repositoryId).catch(() => []);

    return (
        <div>
            <h3 className="text-xl">{repository.name}</h3>
            <div>
                <SchemaView repository={repository} />
                <ContentView repository={repository} contents={contents} />
            </div>
        </div>
    );
};

export default Repository;
