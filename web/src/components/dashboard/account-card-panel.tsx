import {Card, CardContent} from "@/components/ui/card"
import {ArrowUpRight, CreditCard, Trash} from "lucide-react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Button} from "@/components/ui/button.tsx";


type Account = {
    id: string
    number: string
    name: string
    balance: number
}


const accounts: Account[] = [
    {id: "1", number: "12345678", name: "Vinícius José Oliveira", balance: 5000.0},
    {id: "2", number: "87654321", name: "Bob Williams", balance: 10000.0},
    {id: "3", number: "23456789", name: "Emma Brown", balance: 25000.0},
    {id: "4", number: "98765432", name: "James Anderson", balance: 3000.0},
    {id: "5", number: "56789012", name: "Neymar", balance: 15000.0},
    {id: "6", number: "34567890", name: "Cristiano Ronaldo", balance: 50000.0},
]

function AccountCard({account}: { account: Account }) {
    return (
        <Card className="w-[310px] rounded-xl overflow-visible">
            <CardContent className="flex flex-row items-center justify-between py-4 text-wrap">
                <div className="flex gap-4 items-center">
                    <CreditCard className="w-4 h-4"/>
                    <div className="flex-col gap-2">
                        <p className="text-sm">{account.name}</p>
                        <p className="text-xs text-muted-foreground">Nº: {account.number}</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant={'ghost'} className="text-destructive" size={"icon"}>
                        <Trash/></Button>
                    <Button
                        variant={'default'} size={"icon"}>
                        <ArrowUpRight/></Button>
                </div>
            </CardContent>
        </Card>
    )
}

export function AccountsCardPanel() {
    return (
        <ScrollArea className="h-[calc(100vh-23.1rem)] py-2 pr-2">
            <div className="space-y-2">
                {accounts.map((account) => (
                    <AccountCard key={account.id} account={account}/>
                ))}
            </div>
        </ScrollArea>
    )
}

