import {Plus} from "lucide-react";

import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button";
import {OrganizationSwitcher,  UserButton} from "@clerk/nextjs";
import {MobileSidebar} from "./mobile-sidebar";
import {FormPopover} from "@/components/form/form-popover";



const Navbar = () => {

    return(
        <nav className="fixed top-0 h-14 px-4  w-full border-b shadow-sm flex items-center bg-white">
            {/* Mobile sidebar */}
            <MobileSidebar/>

            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo/>

                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button variant="primary" size="sm" className="hidden rounded-sm md:block h-auto py-1.5 px-2">
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button  variant="primary" size="sm" className="md:hidden rounded-sm block">
                        <Plus className="h-4 w-4"/>
                    </Button>
                </FormPopover>

            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl="/organization/:id"
                afterLeaveOrganizationUrl="/select-org"
                afterSelectOrganizationUrl="/organization/:id"
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent : "center",
                            alignItems : "center",
                        },
                    },
                }}
                />
                <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements:{
                        avatarBox : {
                            height : 30 ,
                            width : 30,
                        },
                    },
                }}
                />
            </div>
        </nav>
    )
}

export default Navbar;