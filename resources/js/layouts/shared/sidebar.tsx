import React from "react";
import { Link, usePage } from "@inertiajs/react";

import { PageProps, User } from "@/types";
import { navigations } from "@/data/navigations";
import { cn } from "@/lib/utils";

function Sidebar({ user }: { user: User }) {
    //! hooks
    const { ziggy } = usePage<PageProps>().props;

    //! states
    const role = user?.role;

    //! events
    const filteredNavigations = navigations.filter(
        (route) => !route.role || route.role.includes(role)
    );
    return (
        <div className="flex flex-col h-full py-4 space-y-4 bg-white text-slate-900 shadow">
            <div className="flex-1 px-3 py-2">
                <Link
                    href={route("dashboard")}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <img
                        src="/images/logo.png"
                        loading="lazy"
                        className="relative rounded-full w-44 h-44"
                    />
                    <h1 className="text-2xl font-semibold tracking-wider text-primary">
                        Indekos
                    </h1>
                </Link>

                <div className="mt-20 space-y-1">
                    {filteredNavigations.map((route) => (
                        <div key={route.href}>
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex justify-start w-full p-3 text-sm font-medium transition duration-100 rounded-lg cursor-pointer group hover:text-slate-900 hover:bg-primary/30",
                                    ziggy.location === route.href ||
                                        ziggy.location.includes(route.href)
                                        ? "text-white bg-primary"
                                        : "text-slate-900"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon
                                        className={cn("h-5 w-5 mr-3")}
                                    />
                                    {route.label}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
