"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { Edit2, Trash } from "lucide-react";
import { Update } from "./forms/update";
import { Delete } from "./forms/delete";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "start_date",
        header: "Start Date",
    },
    {
        accessorKey: "end_date",
        header: "End Date",
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