"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useRef } from "react";

import { Copy, Key, ListRestart, Trash } from "lucide-react";

import { Project } from "@/validators/project";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProjectEditForm from "./project-edit-form";

const ProjectSettings = ({ project }: { project: Project }) => {
    const projectEditFormRef = useRef<{ submit: () => void }>(null);

    return (
        <div className="container mx-auto py-6 max-w-4xl">
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-bold">Project Settings</h1>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>
                            View and edit your project information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProjectEditForm
                            project={project}
                            ref={projectEditFormRef}
                        />
                    </CardContent>
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
                            <div className="space-y-4 w-full">
                                <div className="flex flex-col p-4 gap-y-4 border rounded-md">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row gap-x-4">
                                            <div className="flex items-center">
                                                <div className="bg-secondary rounded p-2">
                                                    <Key size={18} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span>API Key</span>
                                                <span className="text-xs text-muted-foreground"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                variant="ghost"
                                                className="border text-destructive"
                                            >
                                                <Trash />
                                                <span>Revoke Key</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-x-4">
                                        <div className="grow">
                                            <Input type="password" />
                                        </div>
                                        <div>
                                            <Button
                                                variant="ghost"
                                                className="border"
                                            >
                                                <Copy />
                                            </Button>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="border w-full"
                                    >
                                        <ListRestart />
                                        <span>Regenerate API Key</span>
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div>
                                <h3 className="text-md font-medium mb-2">
                                    Usage Example
                                </h3>
                                <div className="bg-muted rounded-md p-4">
                                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                        {`fetch('http://localhost:3000/content/blog-posts', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
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
