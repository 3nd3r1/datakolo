import Link from "next/link";

import { UserIcon } from "lucide-react";

import { User } from "@/validators/user";

import { logout } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items: { title: string; href: string }[] = [];

const UserNav = ({ user }: { user: User }) => {
    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-full flex items-center rounded-none"
                >
                    <UserIcon className="!w-5 !h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        {user && (
                            <p className="text-sm font-medium leading-none">
                                {user.username}
                            </p>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {items.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                        <Link
                            href={item.href}
                            className="cursor-pointer text-red-900"
                        >
                            <span>{item.title}</span>
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
