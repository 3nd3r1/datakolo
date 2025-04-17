import { useRef } from "react";

import { Project } from "@/validators/project";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ProjectEditForm from "@/components/projects/project-edit-form";

const ProjectEditCard = ({ project }: { project: Project }) => {
    const projectEditFormRef = useRef<{ submit: () => void }>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                    View and edit your project information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ProjectEditForm project={project} ref={projectEditFormRef} />
            </CardContent>
        </Card>
    );
};

export default ProjectEditCard;
