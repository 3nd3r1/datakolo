import { Control } from "react-hook-form";
import { z } from "zod";

import { contentSchemaFieldSchema } from "@/validators/repository";

import {
    BooleanField,
    NumberField,
    TextField,
} from "@/components/common/forms/form-fields";

interface ContentCreateFormFieldProps {
    fieldName: string;
    fieldSchema: z.infer<typeof contentSchemaFieldSchema>;
    // TODO: Can control be typed more strictly?
    control: Control; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const ContentDataField = ({
    fieldName,
    fieldSchema,
    control,
}: ContentCreateFormFieldProps) => {
    switch (fieldSchema.type) {
        case "string":
            return (
                <TextField
                    name={fieldName}
                    label={fieldName}
                    control={control}
                    required={fieldSchema.required}
                />
            );
        case "number":
            return (
                <NumberField
                    name={fieldName}
                    label={fieldName}
                    control={control}
                    required={fieldSchema.required}
                />
            );
        case "boolean":
            return (
                <BooleanField
                    name={fieldName}
                    label={fieldName}
                    control={control}
                    required={fieldSchema.required}
                />
            );
    }
};

export default ContentDataField;
