import React from "react";
import Navbar from "@/app/(Platform)/(dashboard)/_components/navbar";

const DashBoardLayout = ({
    children
}:{
    children : React.ReactNode;
})=> {
    return(
        <div className="h-full">
            <Navbar/>
            {children}
        </div>
    )
}

export default  DashBoardLayout;