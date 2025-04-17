import { Project } from "@/validators/project";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ProjectRequestPreviewCard = ({ project }: { project: Project }) => {
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>API Request</CardTitle>
                <CardDescription>Your generated API request</CardDescription>
            </CardHeader>
            <CardContent>{project.name}</CardContent>
        </Card>
    );
};

export default ProjectRequestPreviewCard;
