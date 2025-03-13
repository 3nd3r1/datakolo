"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Repository,
    contentSchemaFieldNameSchema,
    contentSchemaFieldSchema,
    newRepositorySchema,
} from "@/validators/repository";

import { updateRepository } from "@/lib/repository";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { BooleanField, TextField } from "@/components/common/forms/form-fields";

const formSchema = contentSchemaFieldSchema.extend({
    name: contentSchemaFieldNameSchema,
});

const SchemaFieldCreateDialog = ({
    repository,
}: {
    repository: Repository;
}) => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const repositoryUpdate = newRepositorySchema.partial().parse({
                contentSchema: {
                    ...repository.contentSchema,
                    [values.name]: contentSchemaFieldSchema.parse(values),
                },
            });

            await updateRepository(
                repository.project,
                repository.id,
                repositoryUpdate
            );
            toast({
                title: "Success",
                description: "Field added successfully",
            });
        } catch (error: unknown) {
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "An error occurred",
            });
        }
    };

    // TODO: Make select fields reusable
    return (
        <Dialog>
            <DialogTrigger className="w-full mt-4" asChild>
                <Button variant="default" className="w-full font-medium">
                    <Plus />
                    <span>Add Field</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Field</DialogTitle>
                    <DialogDescription>
                        Add a new field to the schema
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <TextField
                                name="name"
                                label="Name"
                                placeholder="Field name"
                                control={form.control}
                                required={true}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {formSchema.shape.type._def.options.map(
                                                    (option) => (
                                                        <SelectItem
                                                            value={option.value}
                                                            key={option.value}
                                                        >
                                                            {option.value
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                option.value.slice(
                                                                    1
                                                                )}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <h3 className="mb-4 font-bold">Settings</h3>
                                <BooleanField
                                    name="required"
                                    label="Required"
                                    control={form.control}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" className="w-1/2">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="w-1/2"
                        onClick={async () => {
                            await form.handleSubmit(onSubmit)();
                        }}
                    >
                        Add Field
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SchemaFieldCreateDialog;
