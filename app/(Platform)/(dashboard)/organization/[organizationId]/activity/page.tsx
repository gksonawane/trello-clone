import { Info } from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/info";
import {Separator} from "@/components/ui/separator";
import { ActivityList } from "./_components/activity-list";
import {Suspense} from "react";


const ActivityPage = () => {
    return(
        <div className="w-full">
            <Info/>
            <Separator className="my-2"/>
            <Suspense fallback={<ActivityList.Skeleton/>}>
                <ActivityList />
            </Suspense>
        </div>
    )
}

export default ActivityPage;