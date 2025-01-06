import AppHeader from "@/components/app-header";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <AppHeader />
            <main className="w-full h-full">{children}</main>
        </>
    );
};

export default Layout;
