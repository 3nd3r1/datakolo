"use client";

import { Project } from "@/validators/project";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProjectSettings = ({ project }: { project: Project }) => {
    return (
        <div className="container mx-auto py-6 max-w-4xl">
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold">Project Settings</h1>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details - {project.name}</CardTitle>
                        <CardDescription>
                            View and edit your project information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>Not Implemented</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>
                            Generate and manage API keys for accessing your
                            content programmatically
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                Not Implemented
                            </div>

                            <Separator className="my-4" />

                            <div>
                                <h3 className="text-md font-medium mb-2">
                                    Usage Example
                                </h3>
                                <div className="bg-muted rounded-md p-4">
                                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                        Not Implemented
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProjectSettings;
