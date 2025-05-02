import { Project } from "@/validators/project";

import { getProjects } from "@/lib/project";

import ProjectCreateDialog from "@/components/projects/project-create-dialog";
import ProjectList from "@/components/projects/project-list";

const Projects = async () => {
    const result = await getProjects();

    let projects: Project[] = [];
    if (result.success) {
        projects = result.data;
    }

    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">Projects</h2>
                    <p className="text-stone-400">Here are your projects</p>
                </div>
                <ProjectCreateDialog />
            </div>
            <div>
                <ProjectList projects={projects} />
            </div>
        </div>
    );
};

export default Projects;
