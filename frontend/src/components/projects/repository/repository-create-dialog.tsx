"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

import { newRepositorySchema } from "@/validators/repository";

import { createRepository } from "@/lib/repository";

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

const formSchema = newRepositorySchema;

const RepositoryCreateDialog = ({ projectId }: { projectId: string }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        const result = await createRepository(projectId, values);
        if (result.success) {
            const createdRepository = result.data;
            toast({
                title: "Success",
                description: "Repository created successfully",
            });
            setOpen(false);
            form.reset();
            router.push(
                `/projects/${createdRepository.project}/schema/${createdRepository.id}`
            );
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        }

        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="font-medium">
                    <Plus />
                    <span>Create Repository</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Repository</DialogTitle>
                    <DialogDescription>
                        Create a new repository for your project.
                    </DialogDescription>
                </DialogHeader>
                {loading ? (
                    <div className="w-full flex justify-center">
                        <ClipLoader color="white" />
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <TextField
                                    name="name"
                                    label="Name"
                                    placeholder="Repository name"
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
                                Add Repository
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default RepositoryCreateDialog;
