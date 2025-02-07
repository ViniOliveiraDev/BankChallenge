import {Input, InputProps} from "@/components/ui/input";
import {useEffect, useState} from "react";

interface AmountInputProps extends InputProps {
    value: number;
    onChange: (value: number) => void;
    currency?: string;
}

export function AmountInput({value, onChange, currency = "BRL", ...props}: AmountInputProps) {
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
        setDisplayValue(
            value.toLocaleString("pt-BR", {
                style: "currency",
                currency,
            })
        );
    }, [value, currency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const numericValue = parseFloat(rawValue) / 100;
        onChange(numericValue);
    };

    return (
        <Input
            {...props}
            value={displayValue}
            onChange={handleChange}
            onBlur={() => {
                setDisplayValue(
                    value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency,
                    })
                );
            }}
        />
    );
}