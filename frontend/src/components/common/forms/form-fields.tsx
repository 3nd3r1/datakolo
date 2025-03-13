import { Control } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface TextFieldProps {
    name: string;
    label: string;
    // TODO: Improve the type safety of this prop
    control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    placeholder?: string;
    required?: boolean;
}

export const TextField = ({
    name,
    label,
    control,
    placeholder = "",
    required = false,
}: TextFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}{" "}
                        {required && (
                            <span className="text-destructive">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

interface NumberFieldProps {
    name: string;
    label: string;
    // TODO: Improve the type safety of this prop
    control: Control; // eslint-disable-line @typescript-eslint/no-explicit-any
    required?: boolean;
}

export const NumberField = ({
    name,
    label,
    control,
    required = false,
}: NumberFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="capitalize">
                        {label}{" "}
                        {required && (
                            <span className="text-destructive">*</span>
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
};

interface BooleanFieldProps {
    name: string;
    label: string;
    // TODO: Improve the type safety of this prop
    control: Control; // eslint-disable-line @typescript-eslint/no-explicit-any
    required?: boolean;
}

export const BooleanField = ({
    name,
    label,
    control,
    required,
}: BooleanFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-3 space-y-0 py-2">
                    <FormLabel className="capitalize">
                        {label}{" "}
                        {required && (
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
};
