"use client";

import Link from "next/link";
import { useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Content } from "@/validators/content";
import { Repository } from "@/validators/repository";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FlattenedContent = Pick<Content, "id"> & Content["data"];

const ContentList = ({
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
            ...dataColumns,
            {
                id: "actions",
                cell: ({ row }) => {
                    const content = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel className="font-bold">
                                    Actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Link
                                        href={`/projects/${repository.project}/content/${repository.id}/${content.id}`}
                                    >
                                        Edit content
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ];
    }, [contents, repository]);

    return (
        <div className="border rounded-lg">
            <DataTable columns={columns} data={flattenedContent} />
        </div>
    );
};

export default ContentList;
