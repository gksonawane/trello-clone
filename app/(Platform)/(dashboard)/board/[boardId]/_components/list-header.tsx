"use client";

import {List} from "@prisma/client";
import {ElementRef, useRef, useState} from "react";
import {useEventListener} from "usehooks-ts";
import {FormInput} from "@/components/form/form-input";
import {useAction} from "@/hooks/create-actions";
import {updateList} from "@/actions/update-list";
import {toast} from "sonner";
import * as querystring from "node:querystring";
import {ListOptions} from "./list-options";

interface ListHeaderProps {
    data : List;
    onAddCards : () => void;
}

export const ListHeader = ({
   data,
   onAddCards
} : ListHeaderProps) => {

    const [ title, setTitle ] = useState(data.title);
    const [ isEditing, setIsEditing ] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const { execute } = useAction(updateList,{
        onSuccess : (data) => {
            toast.success(`Renamed to "${data.title}"`);
            setTitle(data.title);
            disableEditing();
        }
    });

    const handleSubmit = (formData:FormData) => {
        const title = formData.get("title") as string;
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        if(title === data.title){
            return disableEditing();
        }
        execute({
            title,
            id,
            boardId
        });
    }

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e : KeyboardEvent) => {
        if(e.key === "Escape"){
            formRef.current?.requestSubmit();
        }
    }
    useEventListener("keydown",onKeyDown);

    return(
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {
                isEditing ? (
                    <form
                        ref={formRef}
                        action={handleSubmit}
                        className="flex-1 p-[2px]"
                    >
                        <input hidden id="id" name="id" value={data.id}/>
                        <input hidden id="boardId" name="boardId" value={data.boardId}/>
                        <FormInput
                            id="title"
                            onBlur={onBlur}
                            ref={inputRef}
                            placeholder="Enter list title..."
                            defaultValue={title}
                            className="text-sm p-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input
                                       transition truncate focus:bg-white bg-transparent"
                        />
                        <button hidden type="submit"/>
                    </form>
                ):(
                    <div
                        onClick={enableEditing}
                        className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
                    >
                        { title }
                    </div>
                )
            }
            <ListOptions
                onAddCards={onAddCards}
                data={data}
            />
        </div>
    )
}