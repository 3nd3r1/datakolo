"use client";

import { UserIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/validators/user";

const items: { title: string; href: string }[] = [
    { title: "Logout", href: "/logout" },
];

const UserNav = () => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            setUser(await getUser().catch(() => undefined));
        };
        fetchUser();
    }, []);

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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
