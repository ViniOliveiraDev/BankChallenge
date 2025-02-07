import AddAccountCard from "@/components/dashboard/action-panel/add-account-card.tsx";
import {TransferDialog} from "@/components/transfer/transfer-dialog.tsx";

export function ActionPanel() {
    const userAccount = {
        accountNumber: "12345678",
        balance: 5000,
        name: "Vinícius Oliveira",
    }
    return (
        <div className="flex gap-4 justify-stretch xl:justify-center">
            <TransferDialog originatorAccount={userAccount}/>
            <AddAccountCard/>
        </div>
    )
}

