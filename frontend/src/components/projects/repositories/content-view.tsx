import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Content } from "@/validators/content";
import { Repository } from "@/validators/repository";
import { DataTable } from "@/components/ui/data-table";

type FlattenedContent = Pick<Content, "id"> & Content["data"];

const ContentView = ({
    repository,
    contents,
}: {
    repository: Repository;
    contents: Content[];
}) => {
    const flattenedContent = useMemo(
        () =>
            contents.map((content) => ({
                id: content.id,
                ...content.data,
            })),
        [contents]
    );

    const columns = useMemo<ColumnDef<FlattenedContent>[]>(() => {
        if (!contents.length) return [];

        const dataColumns = Object.entries(repository.contentSchema)
            .filter(([_, field]) => field.required)
            .map(([key, _]) => ({
                accessorKey: key,
                header: key.charAt(0).toUpperCase() + key.slice(1),
            }));

        return [
            {
                accessorKey: "id",
                header: "Id",
            },
            ...dataColumns,
        ];
    }, [contents, repository.contentSchema]);

    return (
        <div className="border rounded-lg">
            <DataTable columns={columns} data={flattenedContent} />
        </div>
    );
};

export default ContentView;
