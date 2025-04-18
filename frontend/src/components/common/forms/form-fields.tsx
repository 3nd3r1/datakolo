import { Control } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface BaseFieldProps {
    name: string;
    label: string;
    control: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    required?: boolean;
}

interface TextFieldProps extends BaseFieldProps {
    placeholder?: string;
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

interface NumberFieldProps extends BaseFieldProps {} // eslint-disable-line @typescript-eslint/no-empty-object-type

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

interface BooleanFieldProps extends BaseFieldProps {} // eslint-disable-line @typescript-eslint/no-empty-object-type

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
                            checked={field.value === true}
                            onCheckedChange={(checked) =>
                                field.onChange(checked)
                            }
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

interface SelectFieldProps extends BaseFieldProps {
    options: { value: string; label: string }[];
}

export const SelectField = ({
    name,
    label,
    control,
    options,
    required = false,
}: SelectFieldProps) => {
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
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{label}</SelectLabel>
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
