import {Plus} from "lucide-react"
import {AccountsCardPanel} from "@/components/dashboard/account-card-panel.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ActionPanel} from "@/components/dashboard/action-panel.tsx";
import {TransactionHistory} from "@/components/dashboard/transaction-history.tsx";

export default function AccountOverview() {
    return (
        <div className="flex gap-4">
            <div className="flex-col">
                <div className="flex justify-between mx-2">
                    <div className="text-foreground font-bold text-2xl mb-4">Accounts</div>
                    <Button variant={"ghost"} size="icon"><Plus
                        className="h-6 w-6"/></Button>
                </div>
                <AccountsCardPanel/>
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-foreground font-bold text-2xl mb-2">Actions</div>
                <ActionPanel/>
            </div>
            <div className="flex-col">
                <div className="flex justify-between mx-2">
                    <div className="text-foreground font-bold text-2xl mb-4">History</div>
                </div>
                <TransactionHistory/>
            </div>
        </div>
    )
}

