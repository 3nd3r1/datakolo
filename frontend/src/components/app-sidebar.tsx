import { Home, User } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";

const items = {
    general: {
        logged: [
            {
                title: "Home",
                url: "/",
                icon: Home,
            },
        ],
        notLogged: [
            {
                title: "Login",
                url: "/login",
                icon: User,
            },
            {
                title: "Register",
                url: "/register",
                icon: User,
            },
        ],
    },
};

const AppSidebar = () => {
    const user = getUser();

    const generalItems =
        user == null ? items.general.notLogged : items.general.logged;

    return (
        <Sidebar>
            <SidebarHeader>
                <h1>Datakolo</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>General</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {generalItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
