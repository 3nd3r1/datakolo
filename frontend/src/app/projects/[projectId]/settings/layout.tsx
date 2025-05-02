import { Separator } from "@/components/ui/separator";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row h-screen">
            <div className="grow flex flex-col">
                <div className="fixed w-full">
                    <header className="block min-h-14 bg-card"></header>
                    <Separator />
                </div>
                <div className="grow py-4 px-8 mt-14">{children}</div>
            </div>
        </div>
    );
}
