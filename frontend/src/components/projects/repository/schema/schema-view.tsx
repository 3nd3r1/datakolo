import { Repository } from "@/validators/repository";

import SchemaFieldCreateDialog from "./schema-field-create-dialog";

const SchemaView = ({ repository }: { repository: Repository }) => {
    return (
        <div className="flex flex-col gap-1 p-4 border rounded-lg">
            <div className="flex flex-col gap-y-2">
                {Object.entries(repository.contentSchema).map(
                    ([key, value]) => (
                        <div
                            key={key}
                            className="flex flex-row justify-between border p-2 rounded-lg"
                        >
                            <div className="flex flex-row items-center gap-x-2">
                                <div className="flex h-8 w-8 items-center justify-center bg-primary/10 rounded-lg p-1">
                                    <span className="text-sm font-medium">
                                        {value.type.charAt(0).toUpperCase() +
                                            value.type.charAt(1).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-md">
                                        {key}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        <span>{value.type}</span>
                                        {value.required && (
                                            <>
                                                <span> · </span>
                                                <span>Required</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    )
                )}
            </div>
            <SchemaFieldCreateDialog repository={repository} />
        </div>
    );
};

export default SchemaView;
