import {Outlet} from "react-router-dom";
import {TopMenu} from "@/components/sidebar/topbar.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

export default function Layout() {
    return (
        <div className="w-full h-screen">
            <TopMenu/>
            <main className="dark:bg-accent pt-12 h-screen">
                <Outlet/>
            </main>
            <Toaster/>
        </div>
    )
}
