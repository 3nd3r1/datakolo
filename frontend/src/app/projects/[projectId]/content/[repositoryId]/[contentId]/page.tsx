import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { getContent } from "@/lib/content";
import { getRepository } from "@/lib/repository";

import { Button } from "@/components/ui/button";

import ContentDisplayName from "@/components/projects/repositories/content/content-display-name";
import ContentEditForm from "@/components/projects/repositories/content/content-edit-form";

const Content = async ({
    params,
}: {
    params: Promise<{
        projectId: string;
        repositoryId: string;
        contentId: string;
    }>;
}) => {
    const { projectId, repositoryId, contentId } = await params;

    const repository = await getRepository(projectId, repositoryId).catch(
        () => undefined
    );
    const content = await getContent(projectId, repositoryId, contentId);

    if (!repository || !content) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center py-2 mb-4">
                <div className="flex flex-row items-center gap-x-2">
                    <Button variant="ghost" asChild className="px-3">
                        <Link
                            href={`/projects/${projectId}/content/${repositoryId}`}
                        >
                            <ArrowLeft size={16} />
                        </Link>
                    </Button>
                    <h3 className="text-lg font-bold">
                        <ContentDisplayName content={content} />
                    </h3>
                </div>
            </div>
            <ContentEditForm repository={repository} content={content} />
        </div>
    );
};

export default Content;
