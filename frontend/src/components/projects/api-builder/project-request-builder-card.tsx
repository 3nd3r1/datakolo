import { Project } from "@/validators/project";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ProjectRequestBuilderCard = ({ project }: { project: Project }) => {
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>API Builder</CardTitle>
                <CardDescription>
                    Create and manage your API endpoints.
                </CardDescription>
            </CardHeader>
            <CardContent>{project.name}</CardContent>
        </Card>
    );
};

export default ProjectRequestBuilderCard;
