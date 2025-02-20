import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Content } from "@/validators/content";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Repository } from "@/validators/repository";

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
        <div className="flex flex-col gap-1 py-4">
            <div className="flex flex-row justify-between items-center py-2">
                <div>
                    <h2 className="text-lg font-bold">Contents</h2>
                    <p className="text-sm text-stone-400">
                        Here are the contents of this repository
                    </p>
                </div>
                <Button variant="default" asChild>
                    <Link
                        href={`/projects/${repository.project}/repositories/${repository.id}/contents/create`}
                    >
                        Add Content
                    </Link>
                </Button>
            </div>
            <div className="border">
                <DataTable columns={columns} data={flattenedContent} />
            </div>
        </div>
    );
};

export default ContentView;
