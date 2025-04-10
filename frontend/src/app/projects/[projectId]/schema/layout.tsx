import { Menu } from "lucide-react";

import { getProject } from "@/lib/project";
import { getRepositories } from "@/lib/repository";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import RepositorySidebar from "@/components/projects/repository/repository-sidebar";

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
            <RepositorySidebar
                projectId={projectId}
                repositories={repositories}
                variant="schema"
            />
            <div className="grow flex flex-col ml-[225px]">
                <div className="w-full fixed">
                    <header className="flex h-14 items-center gap-4 bg-card px-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="ml-auto flex items-center gap-4"></div>
                    </header>
                    <Separator />
                </div>
                <div className="grow py-4 px-8 mt-14">{children}</div>
            </div>
        </div>
    );
}
