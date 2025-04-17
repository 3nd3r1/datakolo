"use client";

import { Project } from "@/validators/project";

import ProjectApiKeyCard from "./project-api-key-card";
import ProjectEditCard from "./project-edit-card";

const ProjectSettings = ({ project }: { project: Project }) => {
    return (
        <div className="container mx-auto py-6 max-w-4xl">
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold">Project Settings</h1>
            </div>

            <div className="grid gap-6">
                <ProjectEditCard project={project} />
                <ProjectApiKeyCard project={project} />
            </div>
        </div>
    );
};

export default ProjectSettings;
