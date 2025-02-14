import { ColumnDef } from "@tanstack/react-table";

import { Content } from "@/validators/content";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";

type FlattenedContent = {
    id: string;
    repository: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    [key: string]: string | number | boolean | Date;
};

const ContentView = ({ contents }: { contents: Content[] }) => {
    const flattenedContent = useMemo(() => {
        return contents.map((content) => ({
            id: content.id,
            repository: content.repository,
            createdBy: content.createdBy,
            createdAt: content.createdAt,
            updatedAt: content.updatedAt,
            ...content.data,
        })) as FlattenedContent[];
    }, [contents]);

    const columns = useMemo(() => {
        const baseColumns: ColumnDef<FlattenedContent>[] = [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "repository",
                header: "Repository",
            },
            {
                accessorKey: "createdBy",
                header: "Created By",
            },
            {
                accessorKey: "createdAt",
                header: "Created At",
            },
            {
                accessorKey: "updatedAt",
                header: "Updated At",
            },
        ];

        if (contents.length === 0) return baseColumns;

        const dataColumns: ColumnDef<FlattenedContent>[] = Object.keys(
            contents[0].data
        ).map((key) => ({
            accessorKey: key,
            header: key,
        }));

        return [
            ...baseColumns,
            ...dataColumns,
        ] as ColumnDef<FlattenedContent>[];
    }, [contents]);

    return (
        <div className="flex flex-col gap-1 py-4">
            <h3 className="text-lg font-bold">Content</h3>
            <DataTable columns={columns} data={flattenedContent} />
        </div>
    );
};

export default ContentView;
