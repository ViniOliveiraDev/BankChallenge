import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {ArrowUpDown, ArrowUpRight, CreditCardIcon, EyeIcon, EyeOffIcon, UserIcon} from "lucide-react";
import {AmountInput} from "./amount-input";
import {TransferSummary} from "@/components/transfer/transfer-summary.tsx";
import {TransferAnimation} from "@/components/transfer/animation/transfer-animation.tsx";
import {toast} from "@/hooks/use-toast.ts";

interface AccountInfo {
    accountNumber: string;
    balance: number;
    name: string;
}

interface TransferDialogProps {
    originatorAccount: AccountInfo;
}

const formSchema = z.object({
    beneficiaryAccount: z
        .string()
        .min(1, "Beneficiary account is required")
        .refine((value) => value.replace(/\D/g, "").length === 8, "Account number must be exactly 8 digits"),
    amount: z.number().positive("Amount must be positive").max(1000000, "Amount cannot exceed 1,000,000"),
});

export function TransferDialog({originatorAccount}: TransferDialogProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"input" | "confirmation" | "processing">("input");
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiaryAccount: "",
            amount: 0,
        },
    });

    const formatAccountNumber = (value: string) => {
        const numericValue = value.replace(/\D/g, "");
        const truncatedValue = numericValue.slice(0, 8);
        return truncatedValue.replace(/(\d{3})(?=\d)/g, "$1.");
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        setStep("confirmation");
    };

    const handleConfirm = () => {
        setStep("processing");
    };

    const handleAnimationComplete = () => {
        const values = form.getValues();
        toast({
            title: "Transfer successful",
            description: `Sent ${values.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })} to account ${values.beneficiaryAccount}`,
        });
        setOpen(false);
        setTimeout(() => {
            setStep("input");
            form.reset();
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
        setStep("input");
        form.reset();
    };

    const handleBack = () => {
        setStep("input");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal>
            <DialogTrigger asChild>
                <Button
                    key="Transfer"
                    variant="outline"
                    className="h-[120px] rounded-xl w-[250px] flex flex-col items-start justify-between p-4 hover:bg-accent hover:border-white/20 hover:text-accent-foreground"
                >
                    <span className="text-sm font-medium">Transfer</span>
                    <ArrowUpDown/>
                </Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-4">
                        {step === "input" && "Send Transfer"}
                        {step === "confirmation" && "Confirm Transfer"}
                        {step === "processing" && "Processing Transfer"}
                    </DialogTitle>
                </DialogHeader>
                {step === "input" && (
                    <>
                        <div className="bg-secondary p-4 rounded-lg mb-6 shadow-sm">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold mb-2">From Account</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleBalanceVisibility}
                                    aria-label={isBalanceVisible ? "Hide balance" : "Show balance"}
                                >
                                    {isBalanceVisible ? <EyeOffIcon className="h-4 w-4"/> :
                                        <EyeIcon className="h-4 w-4"/>}
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <UserIcon className="h-6 w-6 mr-2 text-primary"/>
                                    <div>
                                        <p className="font-medium">{originatorAccount.name}</p>
                                        <p className="text-sm text-muted-foreground">{originatorAccount.accountNumber}</p>
                                    </div>
                                </div>
                                <p className="font-bold text-lg dark:text-muted-foreground text-foreground/70">
                                    {isBalanceVisible
                                        ? new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(originatorAccount.balance)
                                        : "R$ ••••••"}
                                </p>
                            </div>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="beneficiaryAccount"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Beneficiary Account</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <CreditCardIcon
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                                    <Input
                                                        placeholder="Enter account number"
                                                        {...field}
                                                        className="pl-11"
                                                        value={formatAccountNumber(field.value)}
                                                        onChange={(e) => {
                                                            const formattedValue = formatAccountNumber(e.target.value);
                                                            field.onChange(formattedValue);
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <AmountInput
                                                    {...field}
                                                    onChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                    currency="BRL"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-4 justify-between">
                                    <Button type="button" className="w-full" variant="outline"
                                            onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit"
                                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                        <ArrowUpRight className="mr-2 h-4 w-4"/>
                                        Send Transaction
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </>
                )}
                {step === "confirmation" && (
                    <TransferSummary
                        originatorAccount={originatorAccount}
                        beneficiaryAccount={form.getValues().beneficiaryAccount}
                        amount={form.getValues().amount}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        onBack={handleBack}
                    />
                )}
                {step === "processing" && (
                    <TransferAnimation
                        amount={form.getValues().amount}
                        originatorName={originatorAccount.name}
                        beneficiaryAccount={form.getValues().beneficiaryAccount}
                        onComplete={handleAnimationComplete}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}