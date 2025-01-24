import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CreateFieldDialog from "@/components/projects/repositories/field-create-dialog";

import { getRepository } from "@/lib/repository";

const SchemaView = async ({
    projectId,
    repositoryId,
}: {
    projectId: string;
    repositoryId: string;
}) => {
    const repository = await getRepository(projectId, repositoryId).catch(
        () => undefined
    );

    if (!repository) {
        return null;
    }

    return (
        <div className="flex flex-col gap-1 py-4">
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
                            <CreateFieldDialog />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default SchemaView;
