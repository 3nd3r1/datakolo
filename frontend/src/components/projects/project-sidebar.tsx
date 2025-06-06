"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Code,
    Database,
    FileText,
    HomeIcon,
    LucideIcon,
    Settings,
} from "lucide-react";

import { Project } from "@/validators/project";
import { User } from "@/validators/user";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import UserNav from "@/components/common/layouts/user-nav";

const ProjectSidebar = ({
    project,
    user,
}: {
    project: Project;
    user: User;
}) => {
    const pathname = usePathname();
    const items: {
        title: string;
        icon: LucideIcon;
        href: string;
        isActive: boolean;
    }[] = [
        {
            title: "Home",
            icon: HomeIcon,
            href: `/projects/${project.id}`,
            isActive: pathname === `/projects/${project.id}`,
        },
        {
            title: "Schema",
            icon: Database,
            href: `/projects/${project.id}/schema`,
            isActive: pathname.startsWith(`/projects/${project.id}/schema`),
        },
        {
            title: "Content",
            icon: FileText,
            href: `/projects/${project.id}/content`,
            isActive: pathname.startsWith(`/projects/${project.id}/content`),
        },
        {
            title: "API Builder",
            icon: Code,
            href: `/projects/${project.id}/api-builder`,
            isActive: pathname.startsWith(
                `/projects/${project.id}/api-builder`
            ),
        },
        {
            title: "Settings",
            icon: Settings,
            href: `/projects/${project.id}/settings`,
            isActive: pathname.startsWith(`/projects/${project.id}/settings`),
        },
    ];

    return (
        <div className="flex flex-col border-r fixed h-full w-[55px]">
            <Link href={"/"}>
                <div className="p-2 flex items-center justify-center h-14">
                    <Image
                        src="/images/datakolo-icon.svg"
                        alt="logo"
                        width={30}
                        height={30}
                    />
                </div>
            </Link>
            <Separator />
            <nav className="flex flex-col items-center justify-start grow py-2 gap-y-1">
                {items.map((item) => (
                    <TooltipProvider key={item.title}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "text-sm justify-start px-2",
                                        item.isActive && "bg-primary/10"
                                    )}
                                    asChild
                                >
                                    <Link href={item.href}>
                                        <item.icon className="!w-5 !h-5" />
                                    </Link>
                                </Button>
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
                <UserNav user={user} />
            </div>
        </div>
    );
};

export default ProjectSidebar;
