import {useEffect, useState} from "react";
import {ArrowDownLeft, ArrowRightIcon, ArrowUpRight, CheckIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import CurrencyTransfer from "./currency-transfer-animation"; // Importe o componente CurrencyTransfer

interface TransferAnimationProps {
    amount: number;
    originatorName: string;
    beneficiaryAccount: string;
    onComplete?: () => void;
}

export function TransferAnimation({
                                      amount,
                                      originatorName,
                                      beneficiaryAccount,
                                      onComplete,
                                  }: TransferAnimationProps) {
    const [stage, setStage] = useState<"initial" | "transferring" | "complete">("initial");

    useEffect(() => {
        setStage("transferring");
        const transferTimer = setTimeout(() => setStage("complete"), 2000);
        return () => {
            clearTimeout(transferTimer);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <AnimatePresence mode="wait">
                {stage !== "complete" ? (
                    <motion.div
                        key="transfer-animation"
                        initial={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.5}}
                        className="relative flex items-center justify-center min-w-[400px]"
                    >
                        {/* Left Account Circle */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-center">
                  <ArrowUpRight/>
                </span>
                            </div>
                            <span className="font-medium text-sm text-center">{originatorName}</span>
                        </div>

                        {/* Transfer Amount */}
                        <div
                            className={cn(
                                "absolute px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold transition-all duration-700 shadow-lg z-20",
                                stage === "initial" && "opacity-0 left-[20%] scale-75",
                                stage === "transferring" && "opacity-100 left-[50%] scale-100",
                                stage === "complete" && "opacity-0 left-[80%] scale-75",
                            )}
                        >
              <span className="text-lg whitespace-nowrap">
                {amount.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
              </span>
                        </div>

                        {/* Arrow and Line */}
                        <div className="mx-8 flex items-center">
                            <div className="h-0.5 w-32 bg-muted-foreground/20 relative z-10">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-primary transition-all duration-700 origin-left",
                                        stage === "initial" && "scale-x-0",
                                        stage === "transferring" && "scale-x-100",
                                    )}
                                />
                            </div>
                            <ArrowRightIcon
                                className={cn(
                                    "w-6 h-6 text-muted-foreground transition-all duration-500 z-10",
                                    stage === "transferring" && "text-primary",
                                    stage === "complete" && "text-primary",
                                )}
                            />
                        </div>

                        {/* Right Account Circle */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                                <span className="text-2xl font-bold text-center">
                                  <ArrowDownLeft/>
                                </span>
                            </div>
                            <span
                                className={cn(
                                    "font-medium text-sm text-center transition-colors duration-500",
                                    stage === "complete" && "text-primary", // Muda a cor do texto para primary
                                )}
                            >
                                Account {beneficiaryAccount}
                            </span>
                        </div>
                        {/* Success Checkmark */}
                        <div
                            className={cn(
                                "absolute right-[-3rem] flex items-center justify-center transition-all duration-500 z-20",
                                stage !== "complete" && "opacity-0 scale-0",
                                stage === "complete" && "opacity-100 scale-100",
                            )}
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500",
                                    stage === "complete" && "bg-primary", // Muda a cor de fundo para primary
                                )}>
                                <CheckIcon className={cn(
                                    "w-5 h-5 transition-all duration-500 z-20",
                                    stage !== "complete" && "text-white",
                                    stage === "complete" && "text-primary",
                                )}/>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="currency-transfer"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <CurrencyTransfer amount={amount} originatorName={originatorName}
                                          beneficiaryAccount={beneficiaryAccount} onComplete={onComplete}/>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status Text */}
            {stage !== "complete" && (
                <p
                    className={cn(
                        "text-base font-thin text-center transition-all duration-300",
                        stage === "complete" && "text-green-500",
                    )}
                >
                    {stage === "initial" && "Preparing transfer..."}
                    {stage === "transferring" && "Transferring..."}
                    {stage === "complete" && "Transfer complete!"}
                </p>
            )}
        </div>
    );
}