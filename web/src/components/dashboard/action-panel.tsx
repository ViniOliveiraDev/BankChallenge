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
    {text: "Add Account", icon: CreditCard, onClick: () => console.log("Add Account clicked")},
    // {text: "Savings", icon: PiggyBank, onClick: () => console.log("Savings clicked")},
]

export function ActionPanel() {
    return (
        <div className="flex gap-4 justify-stretch xl:justify-center">
            {actions.map((action) => (
                <Button
                    key={action.text}
                    variant="outline"
                    className="h-[120px] rounded-xl w-[250px] flex flex-col items-start justify-between p-4 hover:bg-accent hover:border-white/20 hover:text-accent-foreground"
                    onClick={action.onClick}
                >
                    <span className="text-sm font-medium">{action.text}</span>
                    <action.icon/>
                </Button>
            ))}
        </div>
    )
}

