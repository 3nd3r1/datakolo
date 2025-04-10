import { getProject } from "@/lib/project";

import ProjectSidebar from "@/components/projects/project-sidebar";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const projectId = (await params).projectId;
    const project = await getProject(projectId).catch(() => undefined);

    if (!project) {
        return { children };
    }

    return (
        <div className="flex flex-row h-screen">
            <ProjectSidebar project={project} />
            <main className="flex-1 ml-[55px]">{children}</main>
        </div>
    );
}
