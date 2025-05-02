"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

import { newProjectSchema } from "@/validators/project";

import { createProject } from "@/lib/project";

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

import { TextField } from "@/components/common/forms/form-fields";

const formSchema = newProjectSchema;

const ProjectCreateDialog = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        const result = await createProject(values);
        if (result.success) {
            const createdProject = result.data;
            toast({
                title: "Success",
                description: "Project created successfully",
            });
            redirect("/projects/" + createdProject.id);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        }

        setLoading(false);
    };

    if (loading) {
        return (
            <div className="w-full flex flex-row justify-center">
                <ClipLoader color="white" />
            </div>
        );
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="font-medium">
                    <Plus />
                    <span>Create Project</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to start creating content
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <TextField
                            name="name"
                            label="Name"
                            placeholder="Project name"
                            control={form.control}
                            required={true}
                        />
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
                        Add Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectCreateDialog;
