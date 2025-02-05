import {type LucideIcon} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarGroupContent>
                    <SidebarMenu className="">
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title} className="py-1">
                                <SidebarMenuButton asChild className="hover:bg-primary hover:text-white hover:pl-4">
                                    <a href={item.url}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarMenu>
        </SidebarGroup>
    )
}
