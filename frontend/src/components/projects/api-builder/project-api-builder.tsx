"use client";

import { useMemo, useState } from "react";

import { Repository } from "@/validators/repository";

import ProjectRequestBuilderCard from "./project-request-builder-card";
import ProjectRequestPreviewCard from "./project-request-preview-card";

export enum ApiOperation {
    GetAll = "Get All",
    GetOne = "Get One",
}

const ProjectApiBuilder = ({
    repositories,
}: {
    repositories: Repository[];
}) => {
    const [selectedRepositoryId, setSelectedRepositoryId] = useState<
        string | undefined
    >(undefined);
    const [selectedOperation, setSelectedOperation] = useState<ApiOperation>(
        ApiOperation.GetAll
    );
    const [getOneContentId, setGetOneContentId] = useState<string>("");

    const selectedRepository = useMemo(() => {
        return repositories.find(
            (repository) => repository.id === selectedRepositoryId
        );
    }, [selectedRepositoryId, repositories]);

    return (
        <div className="p-2">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">API Builder</h1>
                <p className="text-gray-500">
                    Build API requests to access your content
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <ProjectRequestBuilderCard
                    selectedRepositoryId={selectedRepositoryId}
                    setSelectedRepositoryId={setSelectedRepositoryId}
                    selectedOperation={selectedOperation}
                    setSelectedOperation={setSelectedOperation}
                    getOneContentId={getOneContentId}
                    setGetOneContentId={setGetOneContentId}
                    repositories={repositories}
                />
                <ProjectRequestPreviewCard
                    repository={selectedRepository}
                    operation={selectedOperation}
                    contentId={getOneContentId}
                />
            </div>
        </div>
    );
};

export default ProjectApiBuilder;
