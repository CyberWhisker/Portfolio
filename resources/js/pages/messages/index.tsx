import Heading from '@/components/heading'
import AppLayout from '@/layouts/app-layout'
import React from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

import { Search, SendHorizonal, Phone, Video, Info } from 'lucide-react'

export default function Index() {
    const conversations = [
        {
            id: 1,
            name: 'John Doe',
            lastMessage: 'Hey bro, are you available later?',
            time: '2m',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            lastMessage: 'Thanks! I’ll check it now.',
            time: '10m',
            active: false,
        },
        {
            id: 3,
            name: 'Client - Render',
            lastMessage: 'Your deployment is now live.',
            time: '1h',
            active: false,
        },
        {
            id: 4,
            name: 'Team Group',
            lastMessage: 'Meeting moved to 3pm.',
            time: '4h',
            active: false,
        },
    ]

    const messages = [
        { id: 1, from: 'them', text: 'Hey! How are you?', time: '10:12 AM' },
        { id: 2, from: 'me', text: 'I’m good! Working on the system.', time: '10:13 AM' },
        { id: 3, from: 'them', text: 'Nice. Can you send me the update later?', time: '10:14 AM' },
        { id: 4, from: 'me', text: 'Sure! I’ll send it after lunch.', time: '10:15 AM' },
    ]

    return (
        <AppLayout>
            <div className="space-y-4">
                <Heading title="Messages Management" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* LEFT SIDEBAR */}
                    <Card className="lg:col-span-4 xl:col-span-3 rounded-2xl shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Inbox</h2>
                                <Button variant="secondary" size="sm" className="rounded-xl">
                                    New
                                </Button>
                            </div>

                            {/* Search */}
                            <div className="relative mt-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search messages..."
                                    className="pl-9 rounded-xl"
                                />
                            </div>
                        </CardHeader>

                        <Separator />

                        <CardContent className="p-0">
                            <ScrollArea className="h-[520px]">
                                <div className="p-2 space-y-1">
                                    {conversations.map((c) => (
                                        <button
                                            key={c.id}
                                            className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition
                        hover:bg-muted
                        ${c.active ? 'bg-muted' : ''}
                      `}
                                        >
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src="" />
                                                <AvatarFallback>
                                                    {c.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .slice(0, 2)
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="font-medium truncate">{c.name}</p>
                                                    <span className="text-xs text-muted-foreground">
                                                        {c.time}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {c.lastMessage}
                                                </p>
                                            </div>

                                            {c.active && (
                                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* RIGHT CHAT PANEL */}
                    <Card className="lg:col-span-8 xl:col-span-9 rounded-2xl shadow-sm flex flex-col">
                        {/* Header */}
                        <CardHeader className="pb-3 border-b">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="font-semibold leading-none">John Doe</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Active now
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-xl">
                                        <Info className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        {/* Messages */}
                        <CardContent className="flex-1 p-0">
                            <ScrollArea className="h-[460px] px-4 py-4">
                                <div className="space-y-3">
                                    {messages.map((m) => (
                                        <div
                                            key={m.id}
                                            className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'
                                                }`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm
                          ${m.from === 'me'
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted'
                                                    }
                        `}
                                            >
                                                <p>{m.text}</p>
                                                <p
                                                    className={`text-[11px] mt-1 opacity-70 ${m.from === 'me'
                                                            ? 'text-primary-foreground'
                                                            : 'text-muted-foreground'
                                                        }`}
                                                >
                                                    {m.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>

                        <Separator />

                        {/* Input */}
                        <div className="p-3">
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Type a message..."
                                    className="rounded-2xl"
                                />
                                <Button className="rounded-2xl px-4">
                                    <SendHorizonal className="h-4 w-4 mr-2" />
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
