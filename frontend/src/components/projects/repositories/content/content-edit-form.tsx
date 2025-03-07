"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

import { Content, createContentDataSchema } from "@/validators/content";
import { Repository, contentSchemaFieldSchema } from "@/validators/repository";

import { Button } from "@/components/ui/button";
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

// TODO: Share components with content-create-dialog.tsx

interface ContentEditFormFieldProps {
    fieldName: string;
    fieldSchema: z.infer<typeof contentSchemaFieldSchema>;
    control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const ContentEditFormField = ({
    fieldName,
    fieldSchema,
    control,
}: ContentEditFormFieldProps) => {
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

const ContentEditForm = ({
    repository,
    content,
}: {
    repository: Repository;
    content: Content;
}) => {
    const formSchema = createContentDataSchema(repository.contentSchema);
    const defaultValues = Object.entries(repository.contentSchema).reduce(
        (acc, [fieldName, fieldSchema]) => {
            if (content.data[fieldName] !== undefined) {
                acc[fieldName] = content.data[fieldName];
                return acc;
            }

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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // TODO: Implement this
        console.log(values);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });
    return (
        <div className="border rounded-lg p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {Object.entries(repository.contentSchema).map(
                        ([fieldName, fieldSchema]) => (
                            <ContentEditFormField
                                key={fieldName}
                                fieldName={fieldName}
                                fieldSchema={fieldSchema}
                                control={form.control}
                            />
                        )
                    )}
                    <div className="w-full flex flex-row justify-end">
                        <Button variant="default" type="submit">
                            <Save />
                            <span>Save</span>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ContentEditForm;
