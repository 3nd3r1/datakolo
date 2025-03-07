"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Library, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import UserNav from "@/components/common/layouts/user-nav";

const MainNavbar = () => {
    const pathname = usePathname();

    const items: {
        title: string;
        href: string;
        icon: LucideIcon;
        isActive: boolean;
    }[] = [
        {
            title: "Projects",
            href: "/projects",
            icon: Library,
            isActive: pathname === "/projects",
        },
    ];

    return (
        <header className="w-full border-b">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <div className="py-3 px-4">
                        <h1 className="text-xl">Datakolo</h1>
                    </div>
                    <Separator orientation="vertical" />
                    <nav className="py-2 px-4 grow">
                        {items.map((item) => (
                            <Button
                                key={item.title}
                                variant="ghost"
                                className={cn(item.isActive && "bg-primary/10")}
                                asChild
                            >
                                <Link href={item.href} key={item.title}>
                                    <item.icon size={16} />
                                    <span>{item.title}</span>
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </div>
                <div className="min-h-full flex">
                    <Separator orientation="vertical" />
                    <UserNav />
                </div>
            </div>
        </header>
    );
};

export default MainNavbar;
