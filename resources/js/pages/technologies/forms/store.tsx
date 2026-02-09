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
        name: '',
        tag: '',
    })

    const handleSubmit = () => {
        post('/technologies', {
            onSuccess: () => {
                toast.success("Technology added successfully")
            },
            onError: () => {
                toast.error("Failed to add technology")
            },
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Technology <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Store Technology</DialogTitle>
                    <DialogDescription>
                        Fill the form below to add a new technology.
                    </DialogDescription>
                </DialogHeader>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" placeholder="React" value={data.name} onChange={(e) => setData("name", e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="username">Tag</FieldLabel>
                            <Selector data={["Frontend", "Backend", "DevOps", "Design"]} label="Select a tag" placeholder="Choose a tag" onchange={(value: string) => setData("tag", value)} />
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
