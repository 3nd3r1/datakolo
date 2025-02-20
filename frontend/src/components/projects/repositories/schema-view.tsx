import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FieldCreateDialog from "@/components/projects/repositories/field-create-dialog";

import { Repository } from "@/validators/repository";

const SchemaView = ({ repository }: { repository: Repository }) => {
    return (
        <div className="flex flex-col gap-1 py-4">
            <div className="py-2">
                <h2 className="text-lg font-bold">Schema</h2>
                <p className="text-sm text-stone-400">
                    Here is the schema of this repository
                </p>
            </div>
            <Table className="border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Required</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(repository.contentSchema).map(
                        ([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{value.type}</TableCell>
                                <TableCell>
                                    {value.required ? "Yes" : "No"}
                                </TableCell>
                            </TableRow>
                        )
                    )}
                    <TableRow>
                        <TableCell colSpan={3} className="p-0">
                            <FieldCreateDialog repository={repository} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default SchemaView;
