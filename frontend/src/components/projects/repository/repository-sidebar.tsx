"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box } from "lucide-react";

import { Repository } from "@/validators/repository";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import RepositoryCreateDialog from "@/components/projects/repository/repository-create-dialog";

interface RepositorySidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    projectId: string;
    repositories: Repository[];
    variant: "schema" | "content";
}

const RepositorySidebar = ({
    projectId,
    repositories,
    variant,
}: RepositorySidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col border-r fixed h-full w-[225px]">
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
                            <Box />
                            {repository.name}
                        </Link>
                    </Button>
                ))}
                <RepositoryCreateDialog projectId={projectId} />
            </div>
        </div>
    );
};

export default RepositorySidebar;
