import ProjectSidebar from "@/components/projects/project-sidebar";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) {
    const projectId = (await params).projectId;
    return (
        <div className="flex flex-row h-screen">
            <ProjectSidebar projectId={projectId} />
            <div className="grow py-4 px-8">{children}</div>
        </div>
    );
}
