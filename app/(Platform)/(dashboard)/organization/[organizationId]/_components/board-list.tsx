import {HelpCircle, User2} from "lucide-react";
import {Hint} from "@/components/hint";
import {FormPopover} from "@/components/form/form-popover";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";

export const BoardList = async() => {

    const { orgId } = auth();

    if(!orgId){
        return redirect("/select-org");
    }

    const boards = await db.board.findMany({
        where : {
            orgId,
        },
        orderBy : {
            createdAt : "desc"
        }
    });

    return(
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"/>
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    boards.map((board)=> (
                        <Link
                            key={board.id}
                            href={`/board/${board.id}`}
                            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                            style={{background : `url(${board.imageThumbUrl})`}}
                        >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>
                            <p className="relative font-semibold text-white">
                                {board.title}
                            </p>
                        </Link>
                    ))
                }
                <FormPopover side="right" sideOffset={10}>
                <div
                    role="button"
                    className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center
                                justify-center hover:opacity-75 transition"
                >
                    <p className="text-sm">
                        Create new board
                    </p>
                    <span className="text-xs">
                        5 remaining
                    </span>
                    <Hint
                        sideOffset={40}
                        description={`
                            Free workspaces can have up to 5 open boards. Upgrade for unlimited boards.
                        `}
                    >
                        <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]"/>
                    </Hint>
                </div>
                </FormPopover>
            </div>
        </div>
    )
}

    BoardList.Skeleton = function SkeletonBoardList() {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton className="aspect-video h-full w-full"/>
                <Skeleton className="aspect-video h-full w-full"/>
                <Skeleton className="aspect-video h-full w-full"/>
                <Skeleton className="aspect-video h-full w-full"/>
                <Skeleton className="aspect-video h-full w-full"/>
                <Skeleton className="aspect-video h-full w-full"/>
                <Skeleton className="aspect-video h-full w-full"/>
            </div>
        )
    }