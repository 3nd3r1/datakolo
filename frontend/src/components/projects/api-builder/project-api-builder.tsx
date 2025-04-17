import { Project } from "@/validators/project";

import ProjectRequestBuilderCard from "./project-request-builder-card";
import ProjectRequestPreviewCard from "./project-request-preview-card";

const ProjectApiBuilder = ({ project }: { project: Project }) => {
    return (
        <div className="p-2">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">API Builder</h1>
                <p className="text-gray-500">
                    Create and manage your API endpoints.
                </p>
            </div>
            <div className="flex flex-row gap-x-4 justify-between">
                <ProjectRequestBuilderCard project={project} />
                <ProjectRequestPreviewCard project={project} />
            </div>
        </div>
    );
};

export default ProjectApiBuilder;
