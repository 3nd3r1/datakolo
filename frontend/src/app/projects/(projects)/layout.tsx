import MainNavbar from "@/components/common/layouts/main-navbar";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <MainNavbar />
            <main className="w-full h-full">{children}</main>
        </div>
    );
};

export default Layout;
