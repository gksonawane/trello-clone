"use server";

import {InputType, ReturnType} from "@/actions/create-board/type";
import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";
import {db} from "@/lib/db";
import {createSafeActions} from "@/lib/create-safe-actions";
import {CreateBoard} from "./schema";

const handler = async (data:InputType)  :Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId){
        return {
            error : "Unauthorized",
        };
    }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
    ] = image.split("|");



    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName){
        return {
            error : "Missing fields. Failed to create a board.",
        }
    }

    let board;
    try{
        board = await db.board.create({
            data:{
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
            }
        });
    }catch (error){
        return {
            error : "Failed to create new board."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return { data : board };
}

export const createBoard = createSafeActions(CreateBoard, handler);