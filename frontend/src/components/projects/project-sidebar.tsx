import Link from "next/link";
import { Book, HomeIcon, User } from "lucide-react";

import { Project } from "@/validators/project";
import { getUser } from "@/lib/auth";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectSidebar = async ({ project }: { project: Project }) => {
    const user = await getUser().catch(() => undefined);

    if (!user) {
        return null;
    }

    const items = {
        general: [
            {
                title: "Home",
                icon: HomeIcon,
                url: `/projects/${project.id}`,
            },
            {
                title: "Schema",
                icon: Book,
                url: `/projects/${project.id}/repositories`,
            },
        ],
        user: [
            {
                title: "Logout",
                url: "/logout",
            },
        ],
    };

    return (
        <div className="flex flex-col border-r bg-sidebar/50">
            <Link href={"/"}>
                <div className="p-2 flex items-center justify-center">
                    <h1 className="text-lg font-bold">D</h1>
                </div>
            </Link>
            <Separator />
            <nav className="flex flex-col items-center justify-start grow">
                {items.general.map((item) => (
                    <TooltipProvider key={item.title}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={item.url}>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full flex items-center rounded-none"
                        >
                            <User className="!w-5 !h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {user.username}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {items.user.map((item) => (
                            <DropdownMenuItem key={item.title} asChild>
                                <Link
                                    href={item.url}
                                    className="cursor-pointer text-red-900"
                                >
                                    <span>{item.title}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default ProjectSidebar;
