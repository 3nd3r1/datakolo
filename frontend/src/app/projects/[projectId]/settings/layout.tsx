import { getProject } from "@/lib/project";

import { Separator } from "@/components/ui/separator";

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
        return null;
    }

    return (
        <div className="flex flex-row h-screen">
            <div className="grow flex flex-col">
                <header className="block min-h-14 bg-card"></header>
                <Separator />
                <div className="grow py-4 px-8">{children}</div>
            </div>
        </div>
    );
}
