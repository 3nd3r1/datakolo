import ContentCreateForm from "@/components/projects/repositories/content-create-form";
import { getRepository } from "@/lib/repository";
import { notFound } from "next/navigation";

const CreateContent = async ({
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
        <div>
            <h3 className="text-xl">Create new content</h3>
            <div className="mt-6">
                <ContentCreateForm repository={repository} />
            </div>
        </div>
    );
};

export default CreateContent;
