import { getUser } from "@/lib/auth";
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

    const projectResult = await getProject(projectId);
    if (!projectResult.success) {
        return { children };
    }
    const project = projectResult.data;

    const userResult = await getUser();
    if (!userResult.success) {
        return { children };
    }
    const user = userResult.data;

    return (
        <div className="flex flex-row h-screen">
            <ProjectSidebar project={project} user={user} />
            <main className="flex-1 ml-[55px]">{children}</main>
        </div>
    );
}
