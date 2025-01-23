import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CreateFieldDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="w-full" asChild>
                <Button variant="secondary" className="w-full rounded-none">
                    Add Field
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Field</DialogTitle>
                    <DialogDescription>
                        Add a new field to the schema
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <Label>
                                <span>Name</span>
                            </Label>
                            <Input
                                type="text"
                                className="input"
                                placeholder="Field name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="type">
                                <span>Type</span>
                            </Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a Type" />
                                </SelectTrigger>
                                <SelectContent id="type">
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="string">
                                            Text
                                        </SelectItem>
                                        <SelectItem value="number">
                                            Number
                                        </SelectItem>
                                        <SelectItem value="boolean">
                                            Boolean
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="required" />
                            <Label htmlFor="required">
                                <span>Is Required?</span>
                            </Label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" className="w-1/2">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="default" className="w-1/2">
                        Add Field
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFieldDialog;
