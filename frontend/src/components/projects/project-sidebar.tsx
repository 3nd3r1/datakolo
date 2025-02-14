import Link from "next/link";
import { HomeIcon, Layers, LucideIcon } from "lucide-react";

import { Project } from "@/validators/project";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import UserNav from "@/components/user-nav";

const ProjectSidebar = async ({ project }: { project: Project }) => {
    const items: { title: string; icon: LucideIcon; href: string }[] = [
        {
            title: "Home",
            icon: HomeIcon,
            href: `/projects/${project.id}`,
        },
        {
            title: "Repositories",
            icon: Layers,
            href: `/projects/${project.id}/repositories`,
        },
    ];

    return (
        <div className="flex flex-col border-r bg-sidebar/50">
            <Link href={"/"}>
                <div className="p-2 flex items-center justify-center">
                    <h1 className="text-lg font-bold">D</h1>
                </div>
            </Link>
            <Separator />
            <nav className="flex flex-col items-center justify-start grow py-2">
                {items.map((item) => (
                    <TooltipProvider key={item.title}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className="text-sm justify-start px-2"
                                    >
                                        <item.icon className="!w-5 !h-5" />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>{item.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </nav>
            <Separator />
            <div>
                <UserNav />
            </div>
        </div>
    );
};

export default ProjectSidebar;
