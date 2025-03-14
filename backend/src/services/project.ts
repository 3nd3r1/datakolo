import { NewProject, ProjectDTO, toProjectDTO } from "@/validators/project.ts";
import Project from "@/models/project.ts";

export class DuplicateProjectError extends Error {}
export class ProjectNotFoundError extends Error {}

const createProject = async (newProject: NewProject): Promise<ProjectDTO> => {
    if (await Project.findOne({ name: newProject.name })) {
        throw new DuplicateProjectError();
    }

    const createdProject = new Project(newProject);
    await createdProject.save();

    return toProjectDTO(createdProject);
};

const getProjectsByCreator = async (
    creatorId: string,
): Promise<ProjectDTO[]> => {
    const projects = await Project.find({ createdBy: creatorId });
    return projects.map((project) => toProjectDTO(project));
};

const getProjectById = async (id: string): Promise<ProjectDTO> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new ProjectNotFoundError();
    }
    return toProjectDTO(project);
};

const projectService = {
    createProject,
    getProjectsByCreator,
    getProjectById,
};

export default projectService;
