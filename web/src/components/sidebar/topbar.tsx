import {Link, useLocation} from "react-router-dom"
import {BarChart3, CreditCard, Gem, Home} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {ModeToggle} from "@/components/sidebar/mode-toggle.tsx";

const menuItems = [
    {name: "Dashboard", href: "/", icon: Home},
    {name: "Accounts", href: "/accounts", icon: CreditCard},
    {name: "Transactions", href: "/transactions", icon: BarChart3},
]

export function TopMenu() {
    const location = useLocation()
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-12 items-center justify-between">
                    <div className="flex items-center text-primary font-thin">
                        <Link to="/" className="flex items-center space-x-2">
                            <Gem className="w-6 h-6 mr-2"/>Bank Challenge
                        </Link>
                    </div>
                    <div className="flex gap-6 md:gap-10">

                        {menuItems.map((item) => (
                            <Button
                                key={item.name}
                                variant="ghost"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    location.pathname === item.href ? "text-primary" : "text-muted-foreground",
                                )}
                                asChild
                            >
                                <Link to={item.href}>
                                    <item.icon className="h-4 w-4 mr-2"/>
                                    {item.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                    <div>
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </nav>
    )
}
