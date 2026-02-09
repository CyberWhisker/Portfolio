"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Update } from "./forms/update";
import { Delete } from "./forms/delete";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "url",
        header: "URL",
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
    return (
        <div className="flex gap-3 justify-center">
            <Update row={row.original} />
            <Delete row={row.original} />
        </div>
    );
}