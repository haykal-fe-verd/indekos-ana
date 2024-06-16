import React from "react";
import { Loader2, Search } from "lucide-react";
import { router } from "@inertiajs/react";
import { pickBy } from "lodash";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/pagination";

function DataTable({ data, header, link, children, caption }: any) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const perpage = React.useRef<string>(data.per_page);
    const [search, setSearch] = React.useState<string>("");
    const [searchChanged, setSearchChanged] = React.useState<boolean>(false);

    // handle items per page
    const handlePerPageChange = (e: string) => {
        perpage.current = e;
        getData();
    };

    // handle search
    React.useEffect(() => {
        if (searchChanged) {
            const delaySearch = setTimeout(() => {
                getData();
            }, 300);

            return () => {
                clearTimeout(delaySearch);
            };
        }
        setSearchChanged(true);
    }, [search, setSearchChanged]);

    const getData = () => {
        setIsLoading(true);
        router.get(route(link), pickBy({ perpage: perpage.current, search }), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <div className="rounded-md">
            {/* search */}
            {link ? (
                <div className="flex flex-col items-start justify-between mb-5 space-y-5 md:items-center md:space-y-0 md:flex-row">
                    <div className="flex items-center">
                        <span className="mr-2">Show</span>
                        <Select
                            name="perpage"
                            onValueChange={handlePerPageChange}
                            defaultValue={perpage.current.toString()}
                        >
                            <SelectTrigger className="w-20 bg-white">
                                <SelectValue placeholder={perpage.current} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={String(10)}>10</SelectItem>
                                <SelectItem value={String(50)}>50</SelectItem>
                                <SelectItem value={String(100)}>100</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="ml-2">Entries</span>
                    </div>

                    <div className="relative w-full rounded-md md:w-1/3">
                        <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none rounded-tl-md rounded-bl-md bg-primary">
                            <Search className="text-white" />
                        </div>
                        <Input
                            name="search"
                            id="search"
                            autoComplete="search"
                            type="search"
                            placeholder="Search something..."
                            className="pl-14"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            ) : null}

            {/* table */}
            <div className="border rounded-md">
                <Table>
                    {caption && <TableCaption>{caption}</TableCaption>}
                    <TableHeader>
                        <TableRow>
                            {header.map((item: any, index: number) => (
                                <TableHead
                                    key={index}
                                    className={`${item.className}`}
                                >
                                    {item.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    className="text-center"
                                    colSpan={header.length}
                                >
                                    <span className="flex items-center justify-center">
                                        <Loader2 className="w-7 h-7 animate-spin" />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ) : (
                            children
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* pagination */}
            {link ? (
                <div className="flex flex-col items-center justify-between w-full mt-5 md:flex-row">
                    <div>
                        showing
                        <span className="font-bold"> {data.from}</span> to
                        <span className="font-bold"> {data.to} </span>
                        of
                        <span className="font-bold"> {data.total} </span>
                        results
                    </div>
                    <Pagination links={data.links} />
                </div>
            ) : null}
        </div>
    );
}

export default DataTable;
