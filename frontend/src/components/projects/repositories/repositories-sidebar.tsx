"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Repository } from "@/validators/repository";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface RepositoriesSidebarProps
    extends React.HTMLAttributes<HTMLDivElement> {
    projectId: string;
    repositories: Repository[];
    variant: "schema" | "content";
}

const RepositoriesSidebar = ({
    projectId,
    repositories,
    variant,
}: RepositoriesSidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col border-r">
            <div className="p-2 flex items-center justify-center h-14">
                <h2 className="text-lg font-bold">
                    {variant == "schema"
                        ? "Schema Manager"
                        : " Content Manager"}
                </h2>
            </div>
            <Separator />
            <div className="flex flex-col p-2 gap-y-1">
                {repositories.map((repository) => (
                    <Button
                        variant="ghost"
                        className={cn(
                            "justify-start text-sm",
                            pathname.startsWith(
                                `/projects/${projectId}/${variant}/${repository.id}`
                            ) && "bg-primary/10"
                        )}
                        key={repository.id}
                        asChild
                    >
                        <Link
                            href={`/projects/${projectId}/${variant}/${repository.id}`}
                        >
                            {repository.name}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default RepositoriesSidebar;
