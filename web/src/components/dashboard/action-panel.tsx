import {Button} from "@/components/ui/button"
import {ArrowUpDown, CreditCard} from "lucide-react"
import type React from "react" // Added import for React

type Action = {
    text: string
    icon: React.ElementType
    onClick: () => void
}

const actions: Action[] = [
    {text: "Transfer", icon: ArrowUpDown, onClick: () => console.log("Transfer clicked")},
    {text: "Create Account", icon: CreditCard, onClick: () => console.log("Create Account clicked")},
    // {text: "Savings", icon: PiggyBank, onClick: () => console.log("Savings clicked")},
]

export function ActionPanel() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {actions.map((action) => (
                <Button
                    key={action.text}
                    variant="outline"
                    className="h-[120px] rounded-xl w-[250px] flex flex-col items-start justify-between p-4 hover:bg-accent hover:text-accent-foreground"
                    onClick={action.onClick}
                >
                    <span className="text-sm font-medium">{action.text}</span>
                    <action.icon className="h-6 w-6"/>
                </Button>
            ))}
        </div>
    )
}

