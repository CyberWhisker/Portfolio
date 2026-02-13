import React from "react"
import Heading from "@/components/heading"
import AppLayout from "@/layouts/app-layout"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
    Inbox,
    Trash2,
    Search,
    Star,
    MailOpen,
} from "lucide-react"
import { useForm, usePage } from "@inertiajs/react"

type EmailType = {
    id: number
    email: string
    subject: string
    message: string
    time: string
    read: boolean
    starred: boolean
    tag: string
}

type PageProps = {
    mails: EmailType[]
}

export default function Index() {
    const [selectedEmail, setSelectedEmail] = React.useState<EmailType | null>(null)
    const { mails } = usePage<PageProps>().props;
    const { delete: destroy } = useForm();


    const handleSelectEmail = (mail: EmailType) => {
        setSelectedEmail(mail)
    }

    const handleDelete = (mail: EmailType) => {
        destroy(`/mails/${mail.id}`)
        setSelectedEmail(null)
    }

    return (
        <AppLayout>
            <div className="space-y-4">
                <Heading title="Inbox Management" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* MIDDLE: EMAIL LIST */}
                    <Card className="lg:col-span-4 rounded-2xl shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between gap-2">
                                <h2 className="text-lg font-semibold">Inbox</h2>
                                <Button variant="secondary" size="sm" className="rounded-xl">
                                    <MailOpen className="h-4 w-4 mr-2" />
                                    Mark all read
                                </Button>
                            </div>

                            <div className="relative mt-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search emails..."
                                    className="pl-9 rounded-xl"
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="p-0">
                            <ScrollArea className="h-[560px]">
                                <div className="p-2 space-y-1">
                                    {mails.map((email: any) => (
                                        <button
                                            key={email.id}
                                            className={`w-full text-left p-3 rounded-2xl transition hover:bg-muted
                                            ${email.id === selectedEmail?.id ? "bg-muted" : ""}`}
                                            onClick={() => handleSelectEmail(email)}
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p
                                                            className={`truncate ${email.read ? "font-semibold" : "font-medium"
                                                                }`}
                                                        >
                                                            {email.email}
                                                        </p>

                                                        {email.starred && (
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        )}
                                                    </div>

                                                    <p
                                                        className={`truncate text-sm ${email.read
                                                            ? "text-foreground font-medium"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {email.subject}
                                                    </p>

                                                    <p className="truncate w-60 text-xs text-muted-foreground mt-1">
                                                        {email.message}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2 shrink-0">
                                                    <span className="text-xs text-muted-foreground">
                                                        {email.time}
                                                    </span>
                                                    <Badge variant="outline" className="rounded-xl">
                                                        {email.tag}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* RIGHT: EMAIL PREVIEW */}
                    {selectedEmail ? (

                        <Card className="lg:col-span-8 rounded-2xl shadow-sm flex flex-col">
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h2 className="text-lg font-semibold truncate">
                                            {selectedEmail.subject}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            From: <span className="text-foreground">{selectedEmail.email}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="destructive" size="icon" className="rounded-xl" onClick={() => handleDelete(selectedEmail)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 p-0">
                                <ScrollArea className="h-[520px] px-5 py-4">
                                    <div className="space-y-4">
                                        {/* Sender */}
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>
                                                    {selectedEmail.email
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .slice(0, 2)
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <p className="font-medium">{selectedEmail.email}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    to <span className="text-foreground">me</span>
                                                </p>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Body */}
                                        <div className="text-sm leading-relaxed text-muted-foreground">

                                            <p className="mt-3">
                                                {selectedEmail.message}
                                            </p>

                                            <p className="mt-3">
                                                Regards, <br />
                                                {selectedEmail.email}
                                            </p>

                                        </div>
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="lg:col-span-8 rounded-2xl shadow-sm flex flex-col">
                            <CardContent className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <Inbox className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                    <h2 className="text-lg font-semibold">No email selected</h2>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Select an email from the left to preview its content.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
