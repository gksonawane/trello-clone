import React from "react";

interface ListWrapperProps {
    children : React.ReactNode;
}

export const ListWrapper = ({
    children,
}:ListWrapperProps) => {
    return(
        // <div className="absolute shrink-0 h-full w-[272px] select-none">
            <li className=" shrink-0 h-full w-[272px] select-none">
                {children}
            </li>
        // </div>
    )
}