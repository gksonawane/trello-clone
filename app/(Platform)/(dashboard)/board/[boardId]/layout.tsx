import React from "react";
import {auth} from "@clerk/nextjs/server";
import {notFound, redirect} from "next/navigation";
import {db} from "@/lib/db";
import {BoardNavbar} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/board-navbar";

export async function generateMetadata({
    params
}:{
    params : { boardId : string }
}) {
    const { orgId } = auth();
    if(!orgId)
    return {
        title : "Board"
    }

    const board = await db.board.findUnique({
        where : {
            id : params.boardId,
            orgId
        }
    });

    return {
        title : board?.title || "Board"
    }
}

const BoardIdLayout = async ({
    children,
    params
}:{
    children:React.ReactNode;
    params : { boardId:string; };
}) => {
    const { orgId } = auth();
    if(!orgId){
        redirect("/select-org");
    }

    const board = await db.board.findUnique({
        where:{
            id : params.boardId,
            orgId
        }
    })

    if(!board){
        notFound();
    }

    return(
        <div
            className=" h-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage : `url(${board.imageFullUrl})` }}
        >
            <BoardNavbar data={board}/>
            <div className="absolute inset-0 bg-black/10">
            <main className=" pt-28 h-full">
                {children}
            </main>
            </div>
        </div>
    )
}

export default BoardIdLayout;