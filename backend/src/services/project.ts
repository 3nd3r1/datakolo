import { NewProject, ProjectDTO, toProjectDTO } from "@/validators/project.ts";
import Project from "@/models/project.ts";
import { generateApiKey } from "@/utils/hash.ts";

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

const generateProjectApiKey = async (id: string): Promise<ProjectDTO> => {
    const apiKey = generateApiKey();

    const project = await Project.findByIdAndUpdate(
        id,
        { apiKey },
        { new: true },
    );

    if (!project) {
        throw new ProjectNotFoundError();
    }

    return toProjectDTO(project);
};

const removeProjectApiKey = async (id: string): Promise<ProjectDTO> => {
    const project = await Project.findByIdAndUpdate(
        id,
        { $unset: { apiKey: "" } },
        { new: true },
    );

    if (!project) {
        throw new ProjectNotFoundError();
    }

    return toProjectDTO(project);
};

const getProjectByApiKey = async (apiKey: string): Promise<ProjectDTO> => {
    const project = await Project.findOne({ apiKey });
    if (!project) {
        throw new ProjectNotFoundError();
    }
    return toProjectDTO(project);
};

const projectService = {
    createProject,
    getProjectsByCreator,
    getProjectById,
    generateProjectApiKey,
    removeProjectApiKey,
    getProjectByApiKey,
};

export default projectService;
