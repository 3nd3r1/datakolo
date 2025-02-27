import RepositoriesSidebar from "@/components/projects/repositories/repositories-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProject } from "@/lib/project";
import { getRepositories } from "@/lib/repository";
import { Menu } from "lucide-react";

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
                variant="content"
            />
            <div className="grow flex flex-col">
                <header className="flex h-14 items-center gap-4 bg-card px-6">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="ml-auto flex items-center gap-4"></div>
                </header>
                <Separator />
                <div className="grow py-4 px-8">{children}</div>
            </div>
        </div>
    );
}
