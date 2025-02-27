"use client";

import { Control, useForm } from "react-hook-form";

import { contentSchemaFieldSchema, Repository } from "@/validators/repository";
import {
    createContentDataSchema,
    newContentSchema,
} from "@/validators/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createContent } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";

interface ContentCreateFormFieldProps {
    fieldName: string;
    fieldSchema: z.infer<typeof contentSchemaFieldSchema>;
    // TODO: Can control be typed more strictly?
    control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const ContentCreateFormField = ({
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
                                {fieldName}
                                {fieldSchema.required && " *"}
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
                                {fieldName}
                                {fieldSchema.required && " *"}
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
                        <FormItem className="flex items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="capitalize">
                                {fieldName}
                                {fieldSchema.required && " *"}
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );
    }
};

const ContentCreateForm = ({ repository }: { repository: Repository }) => {
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
        <div className="p-4 border">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {Object.entries(repository.contentSchema).map(
                        ([fieldName, fieldSchema]) => (
                            <ContentCreateFormField
                                key={fieldName}
                                fieldName={fieldName}
                                fieldSchema={fieldSchema}
                                control={form.control}
                            />
                        )
                    )}
                    <Button type="submit" className="w-full">
                        Create Content
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ContentCreateForm;
