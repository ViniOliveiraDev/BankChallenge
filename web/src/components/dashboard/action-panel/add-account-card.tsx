import {Button} from "@/components/ui/button.tsx";
import {CreditCard} from "lucide-react";

export default function AddAccountCard() {
    return (<div>
        <Button
            key="Transfer"
            variant="outline"
            className="h-[120px] rounded-xl w-[250px] flex flex-col items-start justify-between p-4 hover:bg-accent hover:border-white/20 hover:text-accent-foreground"
        >
            <span className="text-sm font-medium">Add Account</span>
            <CreditCard/>
        </Button>
    </div>)


}