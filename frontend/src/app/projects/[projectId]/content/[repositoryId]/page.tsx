import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

import { getRepository } from "@/lib/repository";
import { getContents } from "@/lib/content";

import ContentView from "@/components/projects/repositories/content-view";
import { Button } from "@/components/ui/button";

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
                <Button variant="default" asChild>
                    <Link
                        href={`/projects/${repository.project}/repositories/${repository.id}/contents/create`}
                        className="font-bold"
                    >
                        <Plus />
                        <span>Add Content</span>
                    </Link>
                </Button>
            </div>
            <ContentView repository={repository} contents={contents} />
        </div>
    );
};

export default RepositoryContent;
