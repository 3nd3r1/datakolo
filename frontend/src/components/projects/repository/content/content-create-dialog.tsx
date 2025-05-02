"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    createContentDataSchema,
    newContentSchema,
} from "@/validators/content";
import { Repository } from "@/validators/repository";

import { createContent } from "@/lib/content";

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
import { Form } from "@/components/ui/form";

import ContentDataField from "./content-data-field";

const ContentCreateDialog = ({ repository }: { repository: Repository }) => {
    const { toast } = useToast();

    const formSchema = createContentDataSchema(repository.contentSchema);
    const defaultValues = Object.entries(repository.contentSchema).reduce(
        (acc, [fieldName, fieldSchema]) => {
            if (!fieldSchema.required) return acc;

            switch (fieldSchema.type) {
                case "string":
                    acc[fieldName] = "";
                    break;
                case "number":
                    acc[fieldName] = 0;
                    break;
                case "boolean":
                    acc[fieldName] = false;
                    break;
            }
            return acc;
        },
        {} as z.infer<typeof formSchema>
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Remove undefined values
        // TODO: This should be done in a more type-safe way
        Object.keys(values).forEach((key) =>
            values[key] === undefined ? delete values[key] : {}
        );
        const newContent = newContentSchema.parse({ data: values });

        const result = await createContent(
            repository.project,
            repository.id,
            newContent
        );

        if (result.success) {
            toast({
                title: "Success",
                description: "Content created successfully",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="font-medium">
                    <Plus />
                    <span>Create Content</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>New Content</DialogTitle>
                    <DialogDescription>Create new content</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {Object.entries(repository.contentSchema).map(
                            ([fieldName, fieldSchema]) => (
                                <ContentDataField
                                    key={fieldName}
                                    fieldName={fieldName}
                                    fieldSchema={fieldSchema}
                                    control={form.control}
                                />
                            )
                        )}
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={async () => {
                            await form.handleSubmit(onSubmit)();
                        }}
                    >
                        Add Content
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ContentCreateDialog;
