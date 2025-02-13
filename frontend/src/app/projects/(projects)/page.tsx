import ProjectCreateDialog from "@/components/projects/project-create-dialog";
import ProjectList from "@/components/projects/project-list";

import { getProjects } from "@/lib/project";

const Projects = async () => {
    const projects = await getProjects();

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
