"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization , useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import  { NavItems, Organization } from "./nav-items";

interface SidebarProps {
    storageKey? : string;
}

export const Sidebar = ({
  storageKey = "t-sidebar-state",
}:SidebarProps ) => {
    const [ expand , setExpand ] = useLocalStorage<Record<string, any>>(storageKey, {});
    const {
        organization : activeOrganization,
        isLoaded : isLoadedOrg
    } = useOrganization();

    const {
        userMemberships,
        isLoaded : isLoadedList
    } = useOrganizationList({
        userMemberships : {
            infinite : true,
        },
    });

    const defaultAccordionValue : string [] = Object.keys(expand)
    .reduce((acc:string[] , key:string)=>{
        if(expand[key]){
            acc.push(key);
        }
        return acc;
    },[]);

    const onExpanded = (id:string) => {
        setExpand((curr)=>({
            ...curr,
             [id] : !expand[id],
        }));
    }

    if(!isLoadedOrg || !isLoadedList || userMemberships.isLoading){
        return(
            <>
                <div className='flex items-center justify-between mb-2'>
                    <Skeleton className="h-10 w-[50%]"/>
                    <Skeleton className="h-10 w-10"/>
                </div>
                <div className="space-y-2">
                    <NavItems.Skeleton/>
                    <NavItems.Skeleton/>
                    <NavItems.Skeleton/>
                </div>
            </>
        );
    }

    return (
        <>
        <div className="font-medium text-xs flex items-center mb-1">
            <span className="pl-4">
                Workspaces
            </span>
            <Button
                asChild
                type="button"
                size="icon"
                variant="ghost"
                className="ml-auto"
            >
                <Link href="/select-org">
                      <Plus
                      className="h-4 w-4"
                      />
                </Link>
            </Button>
        </div>
            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-2"
            >
                {
                    userMemberships.data?.map(({ organization }) => (
                        <NavItems
                            key={ organization.id }
                            isActive={ activeOrganization?.id === organization.id }
                            isExpanded={expand[organization.id]}
                            organization={ organization as Organization }
                            onExpand ={ onExpanded }
                        />
                    ))
                }
            </Accordion>
        </>
    );
};