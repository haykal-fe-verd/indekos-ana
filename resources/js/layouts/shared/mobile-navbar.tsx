import React from "react";
import { LogIn, Menu } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationsGuest } from "@/data/navigations-guest";

function MobileNavbar() {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col justify-between p-5 text-black bg-white">
        <div>
          <Link href={route("home")} className="-m-1.5 p-1.5 flex flex-col items-center gap-1">
            <img src="/images/logo.png" alt="Logo" className="w-20 h-20" />
            <h1 className="text-2xl font-semibold tracking-wider text-primary">Indekos</h1>
          </Link>
          <div className="flex flex-col mt-16 space-y-5">
            {navigationsGuest.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm leading-6 ">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link
            href={route("login")}
            className="flex flex-row items-center justify-center gap-3 px-4 py-2 text-center border rounded-md border-primary text-primary hover:shadow-md hover:shadow-primary hover:font-bold"
          >
            <LogIn />
            <span>Masuk</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavbar;
