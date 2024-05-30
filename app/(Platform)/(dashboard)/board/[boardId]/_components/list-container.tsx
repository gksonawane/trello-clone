"use client";

import {ListWithCards} from "@/types";
import { ListForm } from "./list-form"
import {useEffect, useState} from "react";
import {ListItem} from "./list-item";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";


interface ListContainerProps{
    data : ListWithCards[];
    boardId : string;
}

export const ListContainer = ({
    data,
    boardId
}:ListContainerProps)=>{

    const [ orderedData, setOrderedData ] = useState(data);

    function reorder<T>(list:T[], startIndex:number , endIndex:number){
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex,0,removed);

        return(result);
    }

    const onDragEnd = (result:any)=> {
        const { destination, source, type } = result;

        if(!destination){
            return;
        }

    //     if user drags on same position
        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }
    //     if user moves a list
        if( type === "list"){
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({...item, order:index}) );
            setOrderedData(items);
        }

        // todo:server action to trigger backed

    //     if a user tries to move a card
        if(type === "card") {
            let newOrderedData = [...orderedData];

        //     finding the source and destination
            const sourceList = newOrderedData.find((list => list.id === source.droppableId));
            const destinationList = newOrderedData.find((list => list.id === destination.droppableId));

            if(!sourceList || !destinationList){
                return;
            }

        //   check  if cards exist on sourceList
            if(!sourceList.cards){
                sourceList.cards = [];
            }

        //     check if cards exists on dest-list
            if(!destinationList.cards){
                destinationList.cards = [];
            }

        //     user moving a card in same list
            if(source.droppableId === destination.droppableId){
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                );
                reorderedCards.forEach((card,idx) => {
                    card.order = idx;
                });
                sourceList.cards = reorderedCards;

                setOrderedData(newOrderedData);
            //     todo : trigger server action

            //     user moves the card to another list
            }else{
            //     removed the card from source list
                const [moveCard]  = sourceList.cards.splice(source.index,1);

            //     assign new id to move-card
                moveCard.listId = destination.droppableId;

            //     Add card to destination list
                destinationList.cards.splice(destination.index, 0 , moveCard);

            //     reorder the source-list
                sourceList.cards.forEach((card,idx) => {
                    card.order = idx;
                });

            //     updating order of each card in destination-list
                destinationList.cards.forEach((card,idx) => {
                    card.order = idx;
                });

                setOrderedData(newOrderedData);
            //     todo:trigger server action
            }
        }
    };

    useEffect(()=>{
        setOrderedData(data);
    },[data]);

    return(
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="lists" type="list" direction="horizontal">
                    {(provided) => (
                        <ol
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex gap-x-3 h-full"
                        >
                            {
                                orderedData.map((list, index) => {
                                    return(
                                        <ListItem
                                            key={list.id}
                                            data={list}
                                            index={index}
                                        />
                                    )
                                })
                            }
                            {provided.placeholder}
                            <ListForm/>
                            <div className="flex-shrink-0 w-1"/>
                        </ol>
                    )}
                </Droppable>
            </DragDropContext>
    )
}