import {Button} from "@/components/ui/button";
import {ArrowLeftIcon, ArrowRightIcon, CheckIcon, CreditCardIcon, UserIcon, XIcon} from "lucide-react";

interface TransferSummaryProps {
    originatorAccount: {
        accountNumber: string;
        name: string;
    };
    beneficiaryAccount: string;
    amount: number;
    onConfirm: () => void;
    onCancel: () => void;
    onBack: () => void;
}

export function TransferSummary({
                                    originatorAccount,
                                    beneficiaryAccount,
                                    amount,
                                    onConfirm,
                                    onCancel,
                                    onBack,
                                }: TransferSummaryProps) {
    // Função para formatar o número da conta com pontos a cada 3 dígitos
    const formatAccountNumber = (accountNumber: string) => {
        const numericValue = accountNumber.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
        return numericValue.replace(/(\d{3})(?=\d)/g, "$1."); // Adiciona pontos a cada 3 dígitos
    };

    return (
        <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-secondary-foreground flex items-center gap-2">
                    <ArrowRightIcon className="h-6 w-6 text-primary"/>
                    Transfer Summary
                </h3>
                <div className="space-y-4">
                    {/* From Account */}
                    <div className="bg-background p-4 rounded-lg border border-muted">
                        <div className="flex items-center gap-3">
                            <UserIcon className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="text-sm text-muted-foreground">From Account</p>
                                <p className="font-medium">{originatorAccount.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatAccountNumber(originatorAccount.accountNumber)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* To Account */}
                    <div className="bg-background p-4 rounded-lg border border-muted">
                        <div className="flex items-center gap-3">
                            <CreditCardIcon className="h-5 w-5 text-primary"/>
                            <div>
                                <p className="text-sm text-muted-foreground">To Account</p>
                                <p className="font-medium">{formatAccountNumber(beneficiaryAccount)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="bg-background p-4 rounded-lg border border-muted">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="font-bold text-lg text-primary">
                                {amount.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                <Button
                    onClick={onCancel}
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                    <XIcon className=" h-4 w-4"/>
                    Cancel
                </Button>
                <Button onClick={onBack} variant="outline">
                    <ArrowLeftIcon className="h-4 w-4"/>
                    Back
                </Button>
                <Button onClick={onConfirm} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <CheckIcon className="h-4 w-4"/>
                    Confirm Transfer
                </Button>
            </div>
        </div>
    );
}