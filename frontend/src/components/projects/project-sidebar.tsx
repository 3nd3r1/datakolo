import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getRepositories } from "@/lib/repository";

interface ProjectSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    projectId: string;
}

const ProjectSidebar = async ({
    className,
    projectId,
}: ProjectSidebarProps) => {
    const repositories = await getRepositories(projectId).catch(() => []);

    return (
        <div className={cn("pb-12 h-full", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-bold tracking-tight">
                        Repositories
                    </h2>
                    <div className="space-y-1">
                        {repositories.map((repository) => (
                            <Button
                                key={repository.id}
                                variant="ghost"
                                className="w-full justify-start text-sm"
                            >
                                {repository.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSidebar;
