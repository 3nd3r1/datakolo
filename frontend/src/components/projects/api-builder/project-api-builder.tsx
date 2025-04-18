"use client";

import { useState } from "react";

import { Project } from "@/validators/project";
import { Repository } from "@/validators/repository";

import ProjectRequestBuilderCard from "./project-request-builder-card";
import ProjectRequestPreviewCard from "./project-request-preview-card";

const ProjectApiBuilder = ({
    project,
    repositories,
}: {
    project: Project;
    repositories: Repository[];
}) => {
    const [selectedRepositoryId, setSelectedRepositoryId] = useState<
        string | undefined
    >(repositories[0]?.id);

    return (
        <div className="p-2">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">API Builder</h1>
                <p className="text-gray-500">
                    Create and manage your API endpoints.
                </p>
            </div>
            <div className="flex flex-row gap-x-4 justify-between">
                <ProjectRequestBuilderCard
                    selectedRepositoryId={selectedRepositoryId}
                    setSelectedRepositoryId={setSelectedRepositoryId}
                    repositories={repositories}
                />
                <ProjectRequestPreviewCard project={project} />
            </div>
        </div>
    );
};

export default ProjectApiBuilder;
