"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ArrowUpRight, Ellipsis, EyeIcon, EyeOffIcon, TrendingDown, TrendingUp} from "lucide-react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {Separator} from "@/components/ui/separator.tsx";


type Account = {
    id: string
    number: string
    name: string
    balance: number
}


const accounts: Account[] = [
    {id: "1", number: "12345678", name: "Vinícius Oliveira", balance: 5000.0},
    {id: "2", number: "87654321", name: "Vinícius José Oliveira", balance: 10000.0},
    {id: "3", number: "23456789", name: "Vinícius Ribeiro Oliveira", balance: 25000.0},
    // {id: "4", number: "98765432", name: "Vinícius José Ribeiro de Oliveira", balance: 3000.0},
    // {id: "5", number: "56789012", name: "Vinícius Ribeiro", balance: 15000.0},
    // {id: "6", number: "34567890", name: "Vinícius José Ribeiro", balance: 50000.0},
]

function AccountCard({account}: { account: Account }) {
    const [isBalanceVisible, setIsBalanceVisible] = useState(false)

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible)
    }

    return (
        <Card className="mb-4 last:mb-0 w-[280px] rounded-xl overflow-visible">
            <Collapsible>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-wrap">
                    <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                    <div className="flex gap-2 ">
                        <CollapsibleTrigger><Button variant="ghost" size="icon"
                                                    className="text-foreground"><Ellipsis/></Button></CollapsibleTrigger>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-2xl font-bold">
                            {isBalanceVisible
                                ? new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                }).format(account.balance)
                                : "R$ ••••••"}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleBalanceVisibility}
                            aria-label={isBalanceVisible ? "Show balance" : "Hide balance"}
                        >
                            {isBalanceVisible ? <EyeOffIcon className="h-4 w-4"/> : <EyeIcon className="h-4 w-4"/>}
                        </Button>

                    </div>
                    <p className="text-xs text-muted-foreground">Nº: {account.number}</p>
                    <CollapsibleContent
                        className="flex flex-col gap-2 mt-4 data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center font-thin">

                                <div className="text-muted-foreground">Owns</div>
                            </div>
                            <div className="flex gap-4 items-center text-muted-foreground">
                                <TrendingUp className="h-4 w-4 text-primary"/>

                                {isBalanceVisible
                                    ? new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }).format("12234")
                                    : "R$ ••••••"}

                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center font-thin">
                                <div className="text-muted-foreground">Expenses</div>
                            </div>
                            <div className="flex gap-4 items-center text-muted-foreground">
                                <TrendingDown className="h-4 w-4 text-destructive"/>
                                {isBalanceVisible
                                    ? new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }).format("12234")
                                    : "R$ ••••••"}
                            </div>

                        </div>
                        <div className="flex flex-col justify-end">
                            <div className="flex justify-center mt-1"><Separator className="w-1/2 "/></div>
                            <Button className="mt-2 bg-primary hover:bg-primary/80 text-white hover:text-white"
                                    variant="outline">
                                <ArrowUpRight/> Send
                                Transaction</Button>
                        </div>
                    </CollapsibleContent>
                </CardContent>
            </Collapsible>
        </Card>
    )
}

export function TransactionHistory() {
    return (
        <ScrollArea className="h-[calc(100vh-12rem)] w-[calc(100vw-8rem] py-2">
            <div className="space-y-4">
                {accounts.map((account) => (
                    <AccountCard key={account.id} account={account}/>
                ))}
            </div>
        </ScrollArea>
    )
}

