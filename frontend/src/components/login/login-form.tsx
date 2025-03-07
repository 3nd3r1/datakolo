"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

import { loginSchema } from "@/validators/user";

import { login } from "@/lib/auth";

import { useToast } from "@/hooks/use-toast";

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

import { TextField } from "@/components/common/forms/form-fields";

const formSchema = loginSchema;

const LoginForm = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        let success = false;
        setLoading(true);

        try {
            await login(values.username, values.password);
            toast({
                title: "Success",
                description: "Logged in successfully",
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
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full flex flex-row justify-center">
                <ClipLoader color="white" />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TextField
                    name="username"
                    label="Username"
                    placeholder="dragonslayer99"
                    control={form.control}
                    required={true}
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
                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
};
export default LoginForm;
