"use client";

import {forwardRef, KeyboardEventHandler} from "react";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {FormErrors} from "@/components/form/form-error";
import {useFormStatus} from "react-dom";

interface FormTextareaProps{
    id : string;
    label? : string;
    placeholder? : string;
    required? : boolean;
    errors? : Record<string, string[] | undefined>;
    className? : string;
    onBlur? : () => void;
    onClick? : () => void;
    onKeyDown? : KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue? : string;
    disabled? : boolean;
}

export const FormTextarea =forwardRef<HTMLTextAreaElement,FormTextareaProps>(({
    id,
    label,
    placeholder,
    required,
    errors,
    className,
    onBlur,
    onClick,
    onKeyDown,
    defaultValue,
    disabled
},ref)=>{

    const { pending } = useFormStatus();

    return(
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {
                    label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null
                }
                <Textarea
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onClick={onClick}
                    name={id}
                    ref={ref}
                    placeholder={placeholder}
                    required={required}
                    id={id}
                    disabled={pending || disabled}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                    defaultValue={defaultValue}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
});

FormTextarea.displayName = "FormTextarea"