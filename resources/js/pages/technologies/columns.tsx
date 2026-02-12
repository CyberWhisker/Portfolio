"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Update } from "./forms/update";
import { Delete } from "./forms/delete";
import { usePage } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "tag",
        header: "Tag",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Actions row={row} />
        ),
    },
]

const Actions = ({ row }: any) => {
    const { auth }: any = usePage().props;

    if (auth.user.role === "admin") {
        return (
            <div className="flex gap-3 justify-center">
                <Update row={row.original} />
                <Delete row={row.original} />
            </div>
        );
    }
    return (
        <Badge variant="destructive">Action Denied</Badge>
    );
}