import { Repository } from "@/validators/repository";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { ApiOperation } from "./project-api-builder";

const ProjectRequestBuilderCard = ({
    selectedRepositoryId,
    setSelectedRepositoryId,
    selectedOperation,
    setSelectedOperation,
    getOneContentId,
    setGetOneContentId,
    repositories,
}: {
    selectedRepositoryId: string | undefined;
    setSelectedRepositoryId: (repositoryId: string) => void;
    selectedOperation: ApiOperation;
    setSelectedOperation: (operation: ApiOperation) => void;
    getOneContentId: string;
    setGetOneContentId: (contentId: string) => void;
    repositories: Repository[];
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Request Builder</CardTitle>
                <CardDescription>
                    Configure your API request parameters
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Repository</Label>
                    <Select
                        onValueChange={setSelectedRepositoryId}
                        defaultValue={selectedRepositoryId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a repository" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {repositories.map((repository) => (
                                    <SelectItem
                                        key={repository.id}
                                        value={repository.id}
                                    >
                                        {repository.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Operation</Label>
                    <Select
                        onValueChange={setSelectedOperation}
                        defaultValue={selectedOperation}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {Object.values(ApiOperation).map(
                                    (operation) => (
                                        <SelectItem
                                            key={operation}
                                            value={operation}
                                        >
                                            {operation}
                                        </SelectItem>
                                    )
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {selectedOperation === ApiOperation.GetOne && (
                    <div className="space-y-2">
                        <Label>Content ID</Label>
                        <Input
                            type="text"
                            placeholder="Enter content ID"
                            onChange={(e) => setGetOneContentId(e.target.value)}
                            value={getOneContentId}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectRequestBuilderCard;
