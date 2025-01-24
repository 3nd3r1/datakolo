import Link from "next/link";
import { Book, ArrowRight } from "lucide-react";

import { type Project } from "@/types/project";

const ProjectItem = ({ project }: { project: Project }) => (
    <Link href={`/projects/${project.id}`}>
        <div className="border rounded-md p-2 flex items-center justify-between hover:bg-accent">
            <div className="flex items-center">
                <Book className="mr-4" size={50} />
                <h3 className="text-lg font-bold">{project.name}</h3>
            </div>
            <div className="mr-4">
                <ArrowRight size={20} />
            </div>
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
