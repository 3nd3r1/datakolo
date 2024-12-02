import Link from "next/link";
import { Book } from "lucide-react";

import { Project } from "@/types/project";
import { Card, CardTitle } from "@/components/ui/card";

const ProjectItem = ({ project }: { project: Project }) => (
    <Link href={`/projects/${project.id}`}>
        <Card className="p-2 flex flex-row items-center hover:bg-stone-900">
            <Book className="mr-4" size={50} />
            <CardTitle className="text-lg">{project.name}</CardTitle>
        </Card>
    </Link>
);

const ProjectList = ({ projects }: { projects: Project[] }) => (
    <div className="flex flex-col gap-2 mt-6">
        {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
        ))}
    </div>
);

export default ProjectList;
