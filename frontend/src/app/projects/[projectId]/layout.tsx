import ProjectSidebar from "@/components/projects/project-sidebar";
import { getProject } from "@/lib/project";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const projectId = (await params).projectId;
    const project = await getProject(projectId).catch(() => undefined);

    return (
        <div className="flex flex-row h-screen">
            {project && <ProjectSidebar project={project} />}
            <main className="grow">{children}</main>
        </div>
    );
}
