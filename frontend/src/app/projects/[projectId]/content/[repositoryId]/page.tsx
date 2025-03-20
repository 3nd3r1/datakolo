import { notFound } from "next/navigation";

import { getContents } from "@/lib/content";
import { getRepository } from "@/lib/repository";

import ContentCreateDialog from "@/components/projects/repository/content/content-create-dialog";
import ContentView from "@/components/projects/repository/content/content-list";

const RepositoryContent = async ({
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

    const contents = await getContents(projectId, repositoryId).catch(() => []);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center py-2 mb-4">
                <div>
                    <h2 className="text-lg font-bold">Contents</h2>
                    <p className="text-sm text-stone-400">
                        Here are the contents of this repository
                    </p>
                </div>
                <ContentCreateDialog repository={repository} />
            </div>
            <ContentView repository={repository} contents={contents} />
        </div>
    );
};

export default RepositoryContent;
