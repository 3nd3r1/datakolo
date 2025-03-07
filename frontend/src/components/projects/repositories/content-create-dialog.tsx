"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

import {
    createContentDataSchema,
    newContentSchema,
} from "@/validators/content";
import { Repository, contentSchemaFieldSchema } from "@/validators/repository";

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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ContentCreateFormFieldProps {
    fieldName: string;
    fieldSchema: z.infer<typeof contentSchemaFieldSchema>;
    // TODO: Can control be typed more strictly?
    control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const ContentCreateDialogField = ({
    fieldName,
    fieldSchema,
    control,
}: ContentCreateFormFieldProps) => {
    switch (fieldSchema.type) {
        case "string":
            return (
                <FormField
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="capitalize">
                                <span>{fieldName}</span>
                                {fieldSchema.required && (
                                    <span className="text-destructive"> *</span>
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "number":
            return (
                <FormField
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="capitalize">
                                <span>{fieldName}</span>
                                {fieldSchema.required && (
                                    <span className="text-destructive"> *</span>
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "boolean":
            return (
                <FormField
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-x-3 space-y-0 py-2">
                            <FormLabel className="capitalize">
                                <span>{fieldName}</span>
                                {fieldSchema.required && (
                                    <span className="text-destructive">*</span>
                                )}
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
    }
};

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
        try {
            // Remove undefined values
            // TODO: This should be done in a more type-safe way
            Object.keys(values).forEach((key) =>
                values[key] === undefined ? delete values[key] : {}
            );

            const newContent = newContentSchema.parse({ data: values });
            await createContent(repository.project, repository.id, newContent);
            toast({ title: "Success", description: "Content created" });
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
                                <ContentCreateDialogField
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
