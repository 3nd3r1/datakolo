import { notFound } from "next/navigation";

import { getRepository } from "@/lib/repository";

import SchemaView from "@/components/projects/repositories/schema-view";

const Repository = async ({
    params,
}: {
    params: Promise<{ projectId: string; repositoryId: string }>;
}) => {
    const { projectId, repositoryId } = await params;

    const repository = await getRepository(projectId, repositoryId).catch(
        () => undefined
    );

    if (!repository) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center py-2 mb-4">
                <div>
                    <h2 className="text-lg font-bold">Schema</h2>
                    <p className="text-sm text-stone-400">
                        Here is the schema of this repository
                    </p>
                </div>
            </div>
            <SchemaView repository={repository} />
        </div>
    );
};

export default Repository;
