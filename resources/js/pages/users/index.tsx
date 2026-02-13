import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { columns } from "./columns";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users() {
    const { users }: any = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Heading title="Users Management" />
            <Card>
                <CardHeader>
                    <div className="flex w-full justify-between items-center">
                        <CardTitle>Users List</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable data={users} columns={columns} />
                </CardContent>
            </Card>
        </AppLayout>
    )
}