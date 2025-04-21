import { useState } from "react";

import { Copy } from "lucide-react";

import { Repository } from "@/validators/repository";

import { config } from "@/lib/config";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ApiOperation } from "./project-api-builder";

const ProjectRequestPreviewCard = ({
    repository,
    operation,
    contentId,
}: {
    repository: Repository | undefined;
    operation: ApiOperation;
    contentId: string;
}) => {
    const { toast } = useToast();
    const apiUrl = `${config.apiUrl}/v1/projects/${repository?.project}/repositories/${repository?.id}/contents${
        operation === ApiOperation.GetOne ? "/" + contentId : ""
    }`;

    const [activeCodeTab, setActiveCodeTab] = useState<string>("fetch");

    const getExampleCode = () => {
        switch (activeCodeTab) {
            case "fetch":
                return `fetch("${apiUrl}", {
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`;
            case "curl":
                return `curl -X GET "${apiUrl}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;
            default:
                return "";
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>API Request</CardTitle>
                <CardDescription>Your generated API request</CardDescription>
            </CardHeader>
            <CardContent>
                {!repository ? (
                    <div className="w-full flex justify-center items-center">
                        <p className="text-sm text-muted-foreground">
                            Please select a repository to see the API request
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex flex-row items-center justify-between">
                                <Label>API URL</Label>
                                <Button
                                    variant="ghost"
                                    onClick={() => copyToClipboard(apiUrl)}
                                >
                                    <Copy />
                                    <span>Copy</span>
                                </Button>
                            </div>
                            <div className="rounded-md bg-muted p-4 overflow-x-auto">
                                <code className="text-sm font-mono break-all">
                                    {apiUrl}
                                </code>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-row items-center justify-between">
                                <Label>Example</Label>
                                <Button
                                    variant="ghost"
                                    onClick={() =>
                                        copyToClipboard(getExampleCode())
                                    }
                                >
                                    <Copy />
                                    <span>Copy</span>
                                </Button>
                            </div>
                            <Tabs
                                defaultValue={activeCodeTab}
                                value={activeCodeTab}
                                onValueChange={setActiveCodeTab}
                            >
                                <TabsList className="w-full grid grid-cols-2">
                                    <TabsTrigger value="fetch">
                                        Fetch
                                    </TabsTrigger>
                                    <TabsTrigger value="curl">cURL</TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="fetch"
                                    className="rounded-md bg-muted p-4 overflow-x-auto"
                                >
                                    <pre className="text-sm font-mono">
                                        {getExampleCode()}
                                    </pre>
                                </TabsContent>
                                <TabsContent
                                    value="curl"
                                    className="rounded-md bg-muted p-4 overflow-x-auto"
                                >
                                    <pre className="text-sm font-mono">
                                        {getExampleCode()}
                                    </pre>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectRequestPreviewCard;
