"use client";

import {Card} from "@prisma/client";
import {Draggable} from "@hello-pangea/dnd";

interface CardItemProps {
    index : number,
    data : Card
}

export const CardItem = ({
    index,
    data
}:CardItemProps) => {
    return(
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    className="truncate border-transparent border-2 hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
                >
                    { data.title }
                </div>
            )}
        </Draggable>
    )
}