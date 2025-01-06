import Link from "next/link";
import { User } from "lucide-react";

import { getUser } from "@/lib/auth";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const items = {
    general: [
        {
            title: "Home",
            url: "/",
        },
        {
            title: "Projects",
            url: "/projects",
        },
    ],
    user: [
        {
            title: "Logout",
            url: "/logout",
        },
    ],
};

const AppHeader = async () => {
    const user = await getUser().catch(() => undefined);

    if (!user) {
        return null;
    }

    return (
        <header className="p-4 px-8 border-b">
            <div className="flex items-center">
                <h1 className="text-lg font-bold mr-4 lg:mr-6">Datakolo</h1>
                <nav className="flex flex-row items-center gap-4">
                    {items.general.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            className="text-md font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <User className="!w-6 !h-6" size={64} />
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
                                <DropdownMenuItem key={item.title}>
                                    <Link href={item.url}>
                                        <span>{item.title}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
