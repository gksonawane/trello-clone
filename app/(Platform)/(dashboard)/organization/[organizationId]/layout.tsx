import React from "react";
import { startCase } from "lodash";

import {OrgControl} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/OrgControl";
import {auth} from "@clerk/nextjs/server";

export async function generateMetadata() {
    const { orgSlug } = auth();
    return {
        title : startCase(orgSlug || "organization")
    };
}

const OrganizationIdControlLayout = ({
    children
}:{
    children : React.ReactNode;
}) => {
    return (
        <>
            <OrgControl/>
            {children}
        </>
    )
}

export default OrganizationIdControlLayout;