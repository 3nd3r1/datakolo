"use client";

import { useEffect, useRef, useState } from "react";

import { Copy, Eye, EyeOff, Key, Plus, RefreshCw, Trash } from "lucide-react";
import { ClipLoader } from "react-spinners";

import { Project } from "@/validators/project";

import { generateApiKey, getApiKey } from "@/lib/project";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import ProjectEditForm from "./project-edit-form";

const NoProjectApiKey = () => (
    <div className="flex flex-col border rounded-md px-4 py-10 items-center">
        <Key size={32} className="text-muted-foreground mb-2" />
        <h3 className="font-bold text-md mb-2">No API Key Generated</h3>
        <p className="text-sm text-muted-foreground">
            Generate an API key to access your project
        </p>
    </div>
);

const ProjectApiKey = ({ apiKey }: { apiKey: string }) => {
    const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);

    return (
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
                    <Button variant="ghost" className="border text-destructive">
                        <Trash />
                        <span>Revoke Key</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-row gap-x-4">
                <div className="grow relative">
                    <Input
                        type={isApiKeyVisible ? "text" : "password"}
                        value={apiKey}
                        readOnly
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-0 top-0"
                        onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                    >
                        {isApiKeyVisible ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
                <div>
                    <Button variant="ghost" className="border">
                        <Copy />
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    );
};

const ProjectSettings = ({ project }: { project: Project }) => {
    const projectEditFormRef = useRef<{ submit: () => void }>(null);

    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);

    const handleRegenerateApiKey = async () => {
        try {
            setLoading(true);
            const newApiKey = await generateApiKey(project.id);
            setApiKey(newApiKey);
            toast({
                title: "API Key Regenerated",
                description: "Your new API key has been generated.",
            });
        } catch (error: unknown) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchApiKey = async () => {
            const apiKey = await getApiKey(project.id).catch(
                (error: unknown) => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description:
                            error instanceof Error
                                ? error.message
                                : "Something went wrong",
                    });
                    return undefined;
                }
            );
            setApiKey(apiKey);
            setLoading(false);
        };

        fetchApiKey();
    }, [project.id]);

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
                        <div className="mb-4">
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <ClipLoader color="white" />
                                </div>
                            ) : apiKey ? (
                                <ProjectApiKey apiKey={apiKey} />
                            ) : (
                                <NoProjectApiKey />
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-4 w-full">
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="border w-full"
                                        onClick={handleRegenerateApiKey}
                                    >
                                        {apiKey ? (
                                            <>
                                                <RefreshCw />
                                                <span>Regenerate API Key</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus />
                                                <span>Generate API Key</span>
                                            </>
                                        )}
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
