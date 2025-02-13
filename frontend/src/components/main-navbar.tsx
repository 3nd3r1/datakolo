import Link from "next/link";

import { Book, LucideIcon } from "lucide-react";

const items: { title: string; href: string; icon: LucideIcon }[] = [
    { title: "Projects", href: "/projects", icon: Book },
];

const MainNavbar = () => {
    return (
        <header className="w-full border-b flex flex-row items-center">
            <div className="py-2 px-4 border-r">
                <h1 className="text-xl">Datakolo</h1>
            </div>
            <nav>
                {items.map((item) => (
                    <Link
                        href={item.href}
                        key={item.title}
                        className="text-sm px-2"
                    >
                        <item.icon className="!w-5 !h-5" />
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default MainNavbar;
