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
        setLoading(true);

        const result = await login(values.username, values.password);
        if (result.success) {
            toast({
                title: "Success",
                description: "Logged in successfully",
            });
            redirect("/");
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
