import { Button } from "@/components/ui/button";
import { getRepositories } from "@/lib/repository";
import Link from "next/link";

interface ProjectSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    projectId: string;
}

const ProjectSidebar = async ({ projectId }: ProjectSidebarProps) => {
    const repositories = await getRepositories(projectId).catch(() => []);

    return (
        <div className="flex flex-col border-r px-2 bg-sidebar/50">
            <div className="p-4">
                <h2 className="text-lg font-bold tracking-tight">
                    Repositories
                </h2>
            </div>
            <div className="flex flex-col">
                {repositories.map((repository) => (
                    <Link
                        href={`/projects/${projectId}/repositories/${repository.id}`}
                        key={repository.id}
                    >
                        <Button
                            variant="ghost"
                            className="justify-start text-sm"
                        >
                            {repository.name}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectSidebar;
