"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Content, createContentDataSchema } from "@/validators/content";
import { Repository } from "@/validators/repository";

import { updateContent } from "@/lib/content";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import ContentDataField from "./content-data-field";

const ContentEditForm = ({
    repository,
    content,
}: {
    repository: Repository;
    content: Content;
}) => {
    const { toast } = useToast();

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
        try {
            await updateContent(
                repository.project,
                content.repository,
                content.id,
                { data: values }
            );
            toast({
                title: "Success",
                description: `Content has been updated`,
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
                            <ContentDataField
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
