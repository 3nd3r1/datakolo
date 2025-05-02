"use client";

import { useEffect, useState } from "react";

import { Copy, Eye, EyeOff, Key, Plus, RefreshCw, Trash } from "lucide-react";
import { ClipLoader } from "react-spinners";

import { Project, ProjectApiKey } from "@/validators/project";

import {
    generateProjectApiKey,
    getProjectApiKey,
    revokeProjectApiKey,
} from "@/lib/project";

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

const NoProjectApiKeyView = () => (
    <div className="flex flex-col border rounded-md px-4 py-10 items-center">
        <Key size={32} className="text-muted-foreground mb-2" />
        <h3 className="font-bold text-md mb-2">No API Key Generated</h3>
        <p className="text-sm text-muted-foreground">
            Generate an API key to access your project
        </p>
    </div>
);

const ProjectApiKeyView = ({
    apiKey,
    handleRevoke,
}: {
    apiKey: ProjectApiKey;
    handleRevoke: () => void;
}) => {
    const { toast } = useToast();
    const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey.apiKey);
        toast({
            title: "API Key Copied",
            description: "The API key has been copied to your clipboard.",
        });
    };

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
                        <span className="text-xs text-muted-foreground">
                            Generated on {apiKey.apiKeyGeneratedAt.toString()}
                        </span>
                    </div>
                </div>
                <div>
                    <Button
                        variant="ghost"
                        className="border text-destructive"
                        onClick={handleRevoke}
                    >
                        <Trash />
                        <span>Revoke Key</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-row gap-x-4">
                <div className="grow relative">
                    <Input
                        type={isApiKeyVisible ? "text" : "password"}
                        value={apiKey.apiKey}
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
                    <Button
                        variant="ghost"
                        className="border"
                        onClick={handleCopy}
                    >
                        <Copy />
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    );
};

const ProjectApiKeyCard = ({ project }: { project: Project }) => {
    const { toast } = useToast();
    const [apiKey, setApiKey] = useState<ProjectApiKey | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const handleRevokeApiKey = async () => {
        setLoading(true);
        const result = await revokeProjectApiKey(project.id);
        if (result.success) {
            setApiKey(undefined);
            toast({
                title: "API Key Revoked",
                description: "Your API key has been revoked.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        }
        setLoading(false);
    };

    const handleRegenerateApiKey = async () => {
        setLoading(true);
        const result = await generateProjectApiKey(project.id);
        if (result.success) {
            const newApiKey = result.data;
            setApiKey(newApiKey);
            toast({
                title: "API Key Regenerated",
                description: "Your new API key has been generated.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchApiKey = async () => {
            const result = await getProjectApiKey(project.id);
            if (result.success) {
                setApiKey(result.data);
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error,
                });
            }
            setLoading(false);
        };

        fetchApiKey();
    }, [project.id, toast]);
    return (
        <Card>
            <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                    Generate and manage API keys for accessing your content
                    programmatically
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <ClipLoader color="white" />
                        </div>
                    ) : apiKey ? (
                        <ProjectApiKeyView
                            apiKey={apiKey}
                            handleRevoke={handleRevokeApiKey}
                        />
                    ) : (
                        <NoProjectApiKeyView />
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
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectApiKeyCard;
