import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import type {LucideIcon} from "lucide-react"

interface StatCardProps {
    title: string
    value: string
    icon: LucideIcon
    color?: string
}

export function StatCard({title, value, icon: Icon, color = 'text-muted-foreground'}: StatCardProps) {
    return (
        <Card className="rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${color} font-thin`}>{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`}/>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
            </CardContent>
        </Card>
    )
}

