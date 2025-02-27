import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Repository } from "@/validators/repository";

interface RepositoriesSidebarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    projectId: string;
    repositories: Repository[];
    variant: "schema" | "content";
}

const RepositoriesSidebar = async ({
    projectId,
    repositories,
    variant,
}: RepositoriesSidebarProps) => {
    return (
        <div className="flex flex-col border-r">
            <div className="p-2 flex items-center justify-center h-14">
                <h2 className="text-lg font-bold">Repositories</h2>
            </div>
            <Separator />
            <div className="flex flex-col p-2">
                {repositories.map((repository) => (
                    <Link
                        href={`/projects/${projectId}/${variant}/${repository.id}`}
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

export default RepositoriesSidebar;
