"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import {
    contentSchemaFieldNameSchema,
    contentSchemaFieldSchema,
} from "@/validators/repository";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = contentSchemaFieldSchema.extend({
    name: contentSchemaFieldNameSchema,
});

const FieldCreateDialog = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full" asChild>
                <Button variant="secondary" className="w-full rounded-none">
                    Add Field
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Field</DialogTitle>
                    <DialogDescription>
                        Add a new field to the schema
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Field name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {formSchema.shape.type._def.options.map(
                                                    (option) => (
                                                        <SelectItem
                                                            value={option.value}
                                                            key={option.value}
                                                        >
                                                            {option.value
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                option.value.slice(
                                                                    1
                                                                )}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <h3 className="mb-4 font-bold">Settings</h3>
                                <FormField
                                    control={form.control}
                                    name="required"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel>Required</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" className="w-1/2">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="default"
                        className="w-1/2"
                        onClick={async () => {
                            await form.handleSubmit(onSubmit)();
                        }}
                    >
                        Add Field
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FieldCreateDialog;
