import Link from "next/link";

import { Library, LucideIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import UserNav from "@/components/user-nav";

const items: { title: string; href: string; icon: LucideIcon }[] = [
    { title: "Projects", href: "/projects", icon: Library },
];

const MainNavbar = () => {
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
                            <Link href={item.href} key={item.title}>
                                <div className="flex items-center gap-x-2 hover:bg-accent text-sm rounded p-2 transition-colors">
                                    <item.icon size={16} />
                                    <span>{item.title}</span>
                                </div>
                            </Link>
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
