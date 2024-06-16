import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { ExitIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";

import { User } from "@/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSidebar from "@/layouts/shared/mobile-sidebar";
import { cn } from "@/lib/utils";

function Topbar({ user }: { user: User }) {
    //! hooks
    const { post } = useForm();

    //! events
    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <header className="flex items-center p-3 m-5 bg-white shadow rounded-md">
            <MobileSidebar />
            <div className="flex justify-end w-full space-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className={cn("flex items-center gap-3")}>
                            <Avatar className={cn("border border-primary")}>
                                <AvatarImage src={`/avatars/${user?.photo}`} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="hidden lg:block">{user?.nama}</h1>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center gap-x-3"
                            >
                                <PersonIcon className="w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("password.index")}
                                className="flex items-center gap-x-3"
                            >
                                <GearIcon className="w-4 h-4" />
                                <span>Ganti Password</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger className="flex items-center gap-x-3 justify-center w-full">
                                    <ExitIcon className="w-4 h-4" />
                                    <span>Logout</span>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Apakah kamu ingin logout 🥹
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Tidak
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                        >
                                            Ya
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default Topbar;
