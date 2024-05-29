"use client";

import {useFormStatus} from "react-dom";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "default" | "destructive" | "outline" | "ghost" | "link";
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant="primary"
}: FormSubmitProps) => {
    const { pending } = useFormStatus();
    return(
        <Button
            type="submit"
            size="sm"
            variant={variant}
            disabled={disabled || pending}
            className={cn(className)}
        >
            {children}
        </Button>
    )
}