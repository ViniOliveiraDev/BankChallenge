import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDownLeft, ArrowRightFromLine, ArrowUpRight, DollarSign, Plus} from "lucide-react";
import {AccountsCardPanel} from "@/components/dashboard/account-card-panel.tsx";
import {ActionPanel} from "@/components/dashboard/action-panel.tsx";
import TransactionHistory from "@/components/dashboard/transaction-history.tsx";
import UserAccountCard from "@/components/dashboard/user-account-card.tsx";
import {StatCard} from "@/components/dashboard/stats-card.tsx";


const Dashboard = () => {
    return (
        <ScrollArea className="h-full p-4">
            <div className="flex gap-4">
                <div className="flex-1 flex-col md:w-1/2">
                    <div className="flex-col">
                        <div className="text-foreground font-thin text-2xl mb-4">My Account</div>
                        <UserAccountCard/>
                    </div>
                    <div className="flex justify-between md:px-1 pt-6">
                        <div className="text-foreground font-bold text-2xl">Accounts</div>
                        <Button variant={"outline"} size="icon" className="hover:border-white/20 bg-accent"><Plus
                            className="h-6 w-6 "/></Button>
                    </div>
                    <AccountsCardPanel/>
                </div>
                <div className="flex-2 flex-col xl:w-1/2">
                    <div className="text-foreground font-bold text-2xl mb-4 md:px-1 xl:text-center">Actions</div>
                    <ActionPanel/>

                    <div className="flex-col pt-8">
                        <p className="font-thin text-2xl">Monthly Overview</p>
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 mt-4">
                            <StatCard
                                title="Total Received"
                                value="R$ 12,345.67"
                                icon={DollarSign}
                                color="text-primary"
                            />
                            <StatCard
                                title="Total Sent"
                                value="R$ 8,120.00"
                                icon={DollarSign}
                                color="text-destructive"
                            />
                            <StatCard
                                title="Transactions Received"
                                value="5,678"
                                icon={ArrowDownLeft}
                            />
                            <StatCard
                                title="Transactions Sent"
                                value="1,234"
                                icon={ArrowUpRight}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex-col md:w-1/2">

                    <div className="flex justify-between md:px-1">
                        <div className="text-foreground font-bold text-2xl mb-4">History</div>
                        <Button variant={"outline"} size="icon"
                                className="hover:border-white/20 bg-accent"><ArrowRightFromLine
                            className="h-6 w-6 "/></Button>
                    </div>
                    <TransactionHistory/>
                </div>
            </div>
        </ScrollArea>
    )
}

export default Dashboard