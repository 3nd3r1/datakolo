import ProjectSidebar from "@/components/projects/project-sidebar";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const projectId = (await params).id;
    return (
        <div className="flex flex-row">
            <ProjectSidebar
                className="basis-1/6 border-r"
                projectId={projectId}
            />
            <div className="p-4">{children}</div>
        </div>
    );
}
