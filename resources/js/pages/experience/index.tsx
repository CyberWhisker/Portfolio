import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { columns } from "./columns";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "./forms/store";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Experiences',
        href: '/experiences',
    },
];

export default function Experiences() {

    const { experiences }: any = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Heading title="Experiences Management" />
            <Card>
                <CardHeader>
                    <div className="flex w-full justify-between items-center">
                        <CardTitle>Experiences List</CardTitle>
                        <Store />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable data={experiences} columns={columns} />
                </CardContent>
            </Card>
        </AppLayout>
    )
}