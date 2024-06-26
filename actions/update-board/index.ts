"use server";
import {InputType, ReturnType} from "./types"
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeActions} from "@/lib/create-safe-actions";
import {UpdateBoard} from "@/actions/update-board/schema";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTION, ENTITY_TYPE} from "@prisma/client";


const handler = async (data:InputType):Promise<ReturnType> => {
    const { userId , orgId} = auth();

    if(!userId || !orgId){
        return {
            error : "Unauthorized",
        }
    }

    const { title, id } = data;
    let board;
    try{
        board = await db.board.update({
            where:{
                id ,
                orgId,
            },
            data : {
                title,
            }
        });

        await createAuditLog({
            entityId : board.id,
            entityTitle : board.title,
            entityType : ENTITY_TYPE.BOARD,
            action : ACTION.UPDATE
        });

    }catch (error){
        return{
            error : "Failed to update board."
        }
    }
    revalidatePath(`/board/${id}`);
    return { data : board };
}

export const updateBoard = createSafeActions(UpdateBoard,handler);