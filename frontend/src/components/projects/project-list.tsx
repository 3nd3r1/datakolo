import Link from "next/link";
import { Book } from "lucide-react";

import { Project } from "@/types/project";

const ProjectItem = ({ project }: { project: Project }) => (
    <Link href={`/projects/${project.id}`}>
        <div className="p-2 border-2 flex flex-row items-center hover:bg-stone-900">
            <Book className="mr-4" size={50} />
            <h4 className="font-bold">{project.name}</h4>
        </div>
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
