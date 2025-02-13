import RepositoriesSidebar from "@/components/projects/repositories/repositories-sidebar";
import { getProject } from "@/lib/project";
import { getRepositories } from "@/lib/repository";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const projectId = (await params).projectId;
    const project = await getProject(projectId).catch(() => undefined);
    const repositories = await getRepositories(projectId).catch(() => []);

    if (!project) {
        return null;
    }

    return (
        <div className="flex flex-row h-screen">
            <RepositoriesSidebar
                projectId={projectId}
                repositories={repositories}
            />
            <div className="grow py-4 px-8">{children}</div>
        </div>
    );
}
