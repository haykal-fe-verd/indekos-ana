import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/layouts/shared/sidebar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

function MobileSidebar() {
    //! states
    const [isMounted, setIsMounted] = React.useState(false);

    //! mounted
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;
