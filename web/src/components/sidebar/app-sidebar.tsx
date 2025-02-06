 

import * as React from "react"
import {ArrowRightLeft, LayoutDashboard, WalletMinimal} from "lucide-react"

import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader,} from "@/components/ui/sidebar"
import {NavMain} from "./nav-main"
import {ModeToggle} from "@/components/sidebar/mode-toggle.tsx";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Accounts",
            url: "#",
            icon: WalletMinimal,
        },
        {
            title: "Transactions",
            url: "#",
            icon: ArrowRightLeft,
        },
    ]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex justify-center items-center w-8 h-8 bg-primary rounded-sm">
                    <span className="text-white">BC</span>
                </div>
            </SidebarHeader>
            <SidebarContent className="mt-1 bg-accent/10">
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter className="p-1">
                <ModeToggle/>
            </SidebarFooter>
        </Sidebar>
    )
}
