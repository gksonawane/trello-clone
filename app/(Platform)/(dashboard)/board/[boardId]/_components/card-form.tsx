"use client";
import {ElementRef, forwardRef, KeyboardEventHandler, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Plus, X} from "lucide-react";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormSubmit} from "@/components/form/form-submit";
import {useAction} from "@/hooks/create-actions";
import {createCard} from "@/actions/create-card";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {toast} from "sonner";
import {useParams} from "next/navigation";

interface CardFormProps{
    listId : string;
    isEditing : boolean;
    enableEditing : () => void;
    disableEditing : () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    isEditing,
    enableEditing,
    disableEditing
},ref) => {

    const params = useParams();

    const formRef = useRef<ElementRef<"form">>(null);

    const { execute , fieldErrors } = useAction(createCard,{
        onSuccess : (data) => {
            toast.success(`Card "${data.title}" created`);
            formRef.current?.reset();
        },
        onError : (error) => {
            toast.error(error);
        }
    });

    const onKeyDown = (e:KeyboardEvent) => {
        if(e.key === "Escape"){
            disableEditing();
        }
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown" , onKeyDown);

    const onTextareaKeyDown : KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    }

    const onSubmit = (formData:FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({
            title,
            listId,
            boardId
        });
    }

    if(isEditing){
        return(
            <form
                action={onSubmit}
                ref={formRef}
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextarea
                    id="title"
                    onKeyDown={onTextareaKeyDown}
                    placeholder="Enter a title for this card..."
                    ref={ref}
                    errors={fieldErrors}
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit variant="default">
                        Add card
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            </form>
        )
    }

    return(
        <div className="pt-2 px">
            <Button
                onClick={enableEditing}
                size="sm"
                variant="ghost"
                className="h-auto w-full px-2 py-1.5 justify-start text-muted-foreground text-sm"
            >
                <Plus className="h-4 w-4 mr-2"/>
                Add a card
            </Button>
        </div>
    )
});

CardForm.displayName = "CardForm";