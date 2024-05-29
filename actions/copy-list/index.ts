"use server";
import {InputType, ReturnType} from "./types"
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeActions} from "@/lib/create-safe-actions";
import {CopyList} from "./schema";



const handler = async (data:InputType):Promise<ReturnType> => {
    const { userId , orgId} = auth();

    if(!userId || !orgId){
        return {
            error : "Unauthorized",
        }
    }

    const {  id , boardId } = data;
    let list;
    try{
       const listToCopy = await db.list.findUnique({
           where : {
               id,
               boardId,
               board : {
                   orgId
               }
           },
           include : {
               cards : true,
           }
       });

       if(!listToCopy){
           return {
               error : "List not found"
           }
       }

       const lastList = await db.list.findFirst({
           where : {
               boardId
           },
           orderBy : {
               order : "desc"
           },
           select : {
               order : true
           }
       });

       const newOrderList = lastList ? lastList.order + 1 : 1;

       list = await db.list.create({
           data : {
               boardId : listToCopy.boardId,
               title : `${listToCopy.title} -Copy`,
               order : newOrderList,
               cards : {
                   createMany : {
                       data : listToCopy.cards.map((card) => ({
                           title : card.title,
                           description : card.description,
                           order : card.order
                       }))
                   }
               }
           },
           include : {
               cards : true,
           }
       })
    }catch (error){
        return{
            error : "Failed to copy a list."
        }
    }
    revalidatePath(`/board/${boardId}`);
    return { data : list }
}

export const copyList = createSafeActions(CopyList,handler);