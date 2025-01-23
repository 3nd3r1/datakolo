import MainSidebar from "@/components/main-sidebar";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-row min-h-screen">
            <MainSidebar />
            <main className="w-full h-full">{children}</main>
        </div>
    );
};

export default Layout;
