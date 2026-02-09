import { Selector } from "@/components/select"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@inertiajs/react"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function Store() {
    const [open, setOpen] = useState(false)
    const { data, setData, post } = useForm({
        title: '',
        company: '',
        description: '',
        start_date: '',
        end_date: '',
    })

    const handleSubmit = () => {
        post('/experiences', {
            onSuccess: () => {
                toast.success("Experience added successfully")
            },
            onError: () => {
                toast.error("Failed to add experience")
            },
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Experience <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Store Experience</DialogTitle>
                    <DialogDescription>
                        Fill the form below to add a new experience.
                    </DialogDescription>
                </DialogHeader>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input id="title" placeholder="Frontend Developer" value={data.title} onChange={(e) => setData("title", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="company">Company</FieldLabel>
                            <Input id="company" placeholder="Google" value={data.company} onChange={(e) => setData("company", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input id="description" placeholder="Worked on frontend development" value={data.description} onChange={(e) => setData("description", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
                            <Input id="start_date" type="date" value={data.start_date} onChange={(e) => setData("start_date", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="end_date">End Date</FieldLabel>
                            <Input id="end_date" type="date" value={data.end_date} onChange={(e) => setData("end_date", e.target.value)} />
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
