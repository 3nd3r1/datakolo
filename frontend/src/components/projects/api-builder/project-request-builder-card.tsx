import { Repository } from "@/validators/repository";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RequestSelect = ({
    value,
    onChange,
    label,
    options,
}: {
    value: string | undefined;
    onChange: (value: string) => void;
    label: string;
    options: { label: string; value: string }[];
}) => {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

const ProjectRequestBuilderCard = ({
    selectedRepositoryId,
    setSelectedRepositoryId,
    repositories,
}: {
    selectedRepositoryId: string | undefined;
    setSelectedRepositoryId: (repositoryId: string) => void;
    repositories: Repository[];
}) => {
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>API Builder</CardTitle>
                <CardDescription>
                    Create and manage your API endpoints.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RequestSelect
                    value={selectedRepositoryId}
                    onChange={setSelectedRepositoryId}
                    label={"Repository"}
                    options={repositories.map((repository) => {
                        return { label: repository.name, value: repository.id };
                    })}
                />
            </CardContent>
        </Card>
    );
};

export default ProjectRequestBuilderCard;
