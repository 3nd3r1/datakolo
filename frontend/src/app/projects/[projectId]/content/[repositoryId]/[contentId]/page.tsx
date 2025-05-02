import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { getContent } from "@/lib/content";
import { getRepository } from "@/lib/repository";

import { Button } from "@/components/ui/button";

import ContentDisplayName from "@/components/projects/repository/content/content-display-name";
import ContentEditForm from "@/components/projects/repository/content/content-edit-form";

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

    const repositoryResult = await getRepository(projectId, repositoryId);
    if (!repositoryResult.success) {
        return notFound();
    }
    const repository = repositoryResult.data;

    const contentResult = await getContent(projectId, repositoryId, contentId);
    if (!contentResult.success) {
        return notFound();
    }
    const content = contentResult.data;

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
                    <h3 className="text-xl font-bold">
                        <ContentDisplayName content={content} />
                    </h3>
                </div>
            </div>
            <ContentEditForm repository={repository} content={content} />
        </div>
    );
};

export default Content;
