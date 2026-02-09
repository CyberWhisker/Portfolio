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
        title: 'Projects',
        href: '/projects',
    },
];

export default function Projects() {
    
    const { projects }: any = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Heading title="Projects Management" />
                <Card>
                    <CardHeader>
                        <div className="flex w-full justify-between items-center">
                            <CardTitle>Projects List</CardTitle>
                            <Store />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable data={projects} columns={columns} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}