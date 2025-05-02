import { forwardRef, useImperativeHandle } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Project, projectUpdateSchema } from "@/validators/project";

import { updateProject } from "@/lib/project";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { TextField } from "@/components/common/forms/form-fields";

const ProjectEditForm = forwardRef<
    { submit: () => void },
    { project: Project; submitButton?: boolean }
>(({ project, submitButton = true }, ref) => {
    const { toast } = useToast();
    const formSchema = projectUpdateSchema;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: project.name,
        },
    });

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.handleSubmit(onSubmit)();
        },
    }));

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await updateProject(project.id, {
            name: values.name,
        });

        if (result.success) {
            toast({
                title: "Success",
                description: "Project updated successfully",
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <TextField
                    name="name"
                    label="Name"
                    placeholder="Project name"
                    control={form.control}
                    required={true}
                />
                {submitButton && (
                    <div className="w-full flex flex-row justify-start">
                        <Button variant="default" type="submit">
                            <Save />
                            <span>Save</span>
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
});
ProjectEditForm.displayName = "ProjectEditForm";

export default ProjectEditForm;
