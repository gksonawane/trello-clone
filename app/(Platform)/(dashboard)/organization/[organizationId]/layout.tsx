import {OrgControl} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/OrgControl";

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