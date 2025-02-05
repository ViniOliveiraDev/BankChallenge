import {SidebarProvider} from "@/components/ui/sidebar"
import {Outlet} from "react-router-dom";
import {TopMenu} from "@/components/sidebar/topbar.tsx";

export default function Layout() {
    return (
        <SidebarProvider>
            <TopMenu/>
            <main className="flex-col dark:bg-accent w-full" style={{marginTop: 60}}>
                <div className="flex-col gap-2 p-10">
                    <Outlet/>
                </div>
            </main>
        </SidebarProvider>
    )
}
