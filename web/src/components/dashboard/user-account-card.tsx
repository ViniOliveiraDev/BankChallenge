import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis, EyeIcon, EyeOffIcon, TrendingDown, TrendingUp} from "lucide-react";
import {useState} from "react";

type Account = {
    id: string
    number: string
    name: string
    balance: number
}
const userAccount: Account = {id: "1", number: "12345678", name: "Vinícius Oliveira", balance: 5000.0}

export default function UserAccountCard() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(false)

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible)
    }
    return <Card className="w-[310px] rounded-xl overflow-visible">
        <Collapsible>
            <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2 text-wrap">
                <CardTitle className="text-sm font-medium">{userAccount.name}</CardTitle>
                <div className="flex gap-2 ">
                    <CollapsibleTrigger asChild><Button variant="ghost" size="icon"
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
                            }).format(userAccount.balance)
                            : "R$ ••••••"}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleBalanceVisibility}
                        aria-label={isBalanceVisible ? "Show balance" : "Hide balance"}
                    >
                        {isBalanceVisible ? <EyeOffIcon className="h-4 w-4"/> :
                            <EyeIcon className="h-4 w-4"/>}
                    </Button>

                </div>
                <p className="text-xs text-muted-foreground">Nº: {userAccount.number}</p>
                <CollapsibleContent
                    className="flex flex-col gap-2 mt-4 data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center font-thin">

                            <div className="text-muted-foreground text-sm">Owns</div>
                        </div>
                        <div className="flex gap-4 items-center text-muted-foreground text-sm">
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
                            <div className="text-muted-foreground text-sm">Expenses</div>
                        </div>
                        <div className="flex gap-4 items-center text-muted-foreground text-sm">
                            <TrendingDown className="h-4 w-4 text-destructive"/>
                            {isBalanceVisible
                                ? new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                }).format("12234")
                                : "R$ ••••••"}
                        </div>
                    </div>
                </CollapsibleContent>
            </CardContent>
        </Collapsible>
    </Card>
}