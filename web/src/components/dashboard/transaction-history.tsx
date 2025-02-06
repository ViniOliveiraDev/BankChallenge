import {useEffect, useState} from "react"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Card} from "@/components/ui/card"
import {ArrowDownLeft, ArrowUpRight} from "lucide-react"

interface Transaction {
    id: string
    date: Date
    originator: string
    beneficiary: string
    amount: number
    type: 'send' | 'received'
}

interface GroupedTransactions {
    [key: string]: Transaction[]
}

function groupTransactionsByDate(transactions: Transaction[]): GroupedTransactions {
    return transactions.reduce((groups, transaction) => {
        const date = transaction.date.toISOString().split("T")[0]
        if (!groups[date]) {
            groups[date] = []
        }
        groups[date].push(transaction)
        return groups
    }, {} as GroupedTransactions)
}

function formatDate(date: string): string {
    const [year, month, day] = date.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day); // Usa o fuso local

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth();

    if (isSameDay(parsedDate, today)) {
        return "Today";
    } else if (isSameDay(parsedDate, yesterday)) {
        return "Yesterday";
    } else {
        return parsedDate.toLocaleDateString("en-US", {day: "numeric", month: "long"});
    }
}


export default function TransactionHistory() {
    const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransactions>({})
    useEffect(() => {
        // Simulating data fetching
        const fetchTransactions = () => {
            const mockTransactions: Transaction[] = [
                {
                    id: "1",
                    date: new Date(),
                    originator: "Vinícius José Oliveira",
                    beneficiary: "Vinícius Oliveira",
                    amount: 1000,
                    type: 'received'
                },
                {
                    id: "2",
                    date: new Date(Date.now() - 86400000),
                    originator: "Vinícius Oliveira",
                    beneficiary: "Bob Williams",
                    amount: 750, type: 'send'
                },
                {
                    id: "3",
                    date: new Date(Date.now() - 86400000),
                    originator: "Emma Brown",
                    beneficiary: "Vinícius Oliveira",
                    amount: 500, type: 'received'
                },
                {
                    id: "4",
                    date: new Date(Date.now() - 172800000),
                    originator: "Vinícius Oliveira",
                    beneficiary: "Vinícius Ribeiro Oliveira",
                    amount: 1200, type: 'send'
                },
                {
                    id: "5",
                    date: new Date(Date.now() - 172800000),
                    originator: "James Anderson",
                    beneficiary: "Vinícius Oliveira",
                    amount: 300, type: 'received'
                },
            ]

            const sorted = mockTransactions.sort((a, b) => b.date.getTime() - a.date.getTime())
            setGroupedTransactions(groupTransactionsByDate(sorted))
        }

        fetchTransactions()
    }, [])

    return (
        <Card className="w-full">
            <ScrollArea className="h-[calc(100vh-8.1rem)] w-full rounded-xl pt-4 px-3">
                {Object.entries(groupedTransactions).map(([date, transactions]) => (
                    <div key={date} className="mb-6">
                        <h3 className="text-md mb-2 font-thin">{formatDate(date.toString().split("T")[0])}</h3>
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="bg-secondary px-4 py-4 md:py-6 rounded-lg mb-2">
                                <div className="flex justify-between items-start mb-1 text-xs">
                                    <div className="font-thin">
                                        <div className="flex items-center">
                                            <ArrowUpRight className="mr-2 text-red-500" size={16}/>
                                            <span className="text-xs">{transaction.originator}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <ArrowDownLeft className="mr-2 text-green-500" size={16}/>
                                            <span className="text-xs">{transaction.beneficiary}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                            <span
                                                className={`font-bold ${transaction.type === 'received' ? 'text-green-500' : ''}`}>R$ {transaction.type === 'send' ? '-' : ''}{transaction.amount.toFixed(2)}</span>
                                        <p className="text-xs text-muted-foreground">
                                            {transaction.date.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </ScrollArea>
        </Card>
    )
}

