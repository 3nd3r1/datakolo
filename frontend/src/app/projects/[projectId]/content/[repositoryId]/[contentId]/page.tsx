import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getContent } from "@/lib/content";
import { getRepository } from "@/lib/repository";

import ContentEditForm from "@/components/projects/repositories/content-edit-form";
import { Button } from "@/components/ui/button";

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
                <div>
                    <Button variant="ghost" asChild>
                        <Link
                            href={`/projects/${projectId}/content/${repositoryId}`}
                        >
                            <ArrowLeft size={16} />
                            <span>Back</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <ContentEditForm repository={repository} content={content} />
        </div>
    );
};

export default Content;
