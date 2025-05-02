import { getUser } from "@/lib/auth";

import MainNavbar from "@/components/common/layouts/main-navbar";

const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const result = await getUser();
    if (!result.success) {
        return null;
    }
    const user = result.data;

    return (
        <div>
            <MainNavbar user={user} />
            <main className="w-full h-full">{children}</main>
        </div>
    );
};

export default Layout;
