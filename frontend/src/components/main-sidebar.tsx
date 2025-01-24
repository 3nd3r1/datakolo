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
import { Separator } from "@/components/ui/separator";
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

const MainSidebar = async () => {
    const user = await getUser().catch(() => undefined);

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col border-r">
            <div className="p-2 flex items-center justify-center">
                <h1 className="text-lg font-bold">Datakolo</h1>
            </div>
            <Separator />
            <nav className="grow p-2">
                {items.general.map((item) => (
                    <Link href={item.url} key={item.title}>
                        <Button
                            variant="ghost"
                            className="text-sm w-full justify-start"
                        >
                            {item.title}
                        </Button>
                    </Link>
                ))}
            </nav>
            <Separator />
            <div className="p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full flex justify-start items-center"
                        >
                            <User className="!w-6 !h-6" size={64} />
                            <p>{user.username}</p>
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
                                <Link href={item.url} className="w-full h-full">
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

export default MainSidebar;
