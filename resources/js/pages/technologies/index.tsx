import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { columns } from "./columns";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Store } from "./forms/store";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Technologies',
        href: '/technologies',
    },
];

export default function Technologies() {

    const { technologies }: any = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Heading title="Technologies Management" />
            <Card>
                <CardHeader>
                    <div className="flex w-full justify-between items-center">
                        <CardTitle>Technologies List</CardTitle>
                        <Store />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable data={technologies} columns={columns} />
                </CardContent>
            </Card>
        </AppLayout>
    )
}