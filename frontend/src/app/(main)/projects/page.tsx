import ProjectList from "@/components/projects/project-list";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/project";

const Projects = async () => {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">Projects</h2>
                    <p className="text-stone-400">Here are your projects</p>
                </div>
                <Button>New Project</Button>
            </div>
            <div>
                <ProjectList projects={projects} />
            </div>
        </div>
    );
};

export default Projects;
