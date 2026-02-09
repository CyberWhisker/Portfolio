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
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        url: '',
    })

    const handleSubmit = () => {
        post('/projects', {
            onSuccess: () => {
                toast.success("Project added successfully")
            },
            onError: () => {
                console.log(errors)
                toast.error("Failed to add project")
            },
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Project <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Store Project</DialogTitle>
                    <DialogDescription>
                        Fill the form below to add a new project.
                    </DialogDescription>
                </DialogHeader>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" placeholder="My Project" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input id="description" placeholder="Worked on frontend development" value={data.description} onChange={(e) => setData("description", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="url">URL</FieldLabel>
                            <Input id="url" placeholder="https://example.com" value={data.url} onChange={(e) => setData("url", e.target.value)} />
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
