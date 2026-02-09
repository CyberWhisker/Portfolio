import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { columns } from "./columns";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users() {
    const { users }: any = usePage().props;

    const Actions = () => {
        return (
            <div className="flex gap-3">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
            </div>
        );
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Heading title="Users Management" />
                <Card>
                    <CardHeader>
                        <div className="flex w-full justify-between items-center">
                            <CardTitle>Users List</CardTitle>
                            <Button variant="outline">Add User</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable data={users} columns={columns} actions={<Actions />} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}