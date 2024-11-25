"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";
import { register } from "@/lib/auth";

const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

const RegisterForm = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let success = false;

        try {
            await register(values.username, values.password);
            toast({
                title: "Success",
                description: "Registered successfully",
            });
            success = true;
        } catch (error: unknown) {
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "An error occurred",
            });
        } finally {
            if (success) {
                redirect("/");
            }
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="dragonslayer99"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="salasana123"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Register</Button>
            </form>
        </Form>
    );
};
export default RegisterForm;
