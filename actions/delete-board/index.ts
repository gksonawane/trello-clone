"use server";
import {InputType, ReturnType} from "./types"
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeActions} from "@/lib/create-safe-actions";
import {DeleteBoard} from "./schema";
import {redirect} from "next/navigation";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTION, ENTITY_TYPE} from "@prisma/client";


const handler = async (data:InputType):Promise<ReturnType> => {
    const { userId , orgId} = auth();

    if(!userId || !orgId){
        return {
            error : "Unauthorized",
        }
    }

    const {  id } = data;
    let board;
    try{
        board = await db.board.delete({
            where:{
                id ,
                orgId,
            },

        });

        await createAuditLog({
            entityId : board.id,
            entityTitle : board.title,
            entityType : ENTITY_TYPE.BOARD,
            action : ACTION.DELETE
        });

    }catch (error){
        return{
            error : "Failed to delete board."
        }
    }
    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);
}

export const deleteBoard = createSafeActions(DeleteBoard,handler);