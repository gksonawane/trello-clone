// creating layout to render the authorized child components

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import {Toaster} from "sonner";
import {ModalProvider} from "@/components/providers/modal-provider";
import {QueryProvider} from "@/components/providers/query-provider";

const PlatFormLayout = ({
    children
}:{
    children : React.ReactNode;
}) => {
    return(
        <ClerkProvider>
            <QueryProvider>
                <Toaster/>
                <ModalProvider/>
                { children }
            </QueryProvider>
        </ClerkProvider>
    )
};

export default  PlatFormLayout;