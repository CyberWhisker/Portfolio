"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Update } from "./forms/update"
import { Delete } from "./forms/delete"
import { Badge } from "@/components/ui/badge"
import { usePage } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserInfo = {
    id: string
    name: string
    email: string
    role: string
    email_verified_at: string | null
    created_at: string
}

export const columns: ColumnDef<UserInfo>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "email_verified_at",
        header: "Email Verified At",
    },
    {
        accessorKey: "role",
        header: "Role",
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