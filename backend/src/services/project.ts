import { NewProject, ProjectDTO, toProjectDTO } from "@/validators/project.ts";
import Project from "@/models/project.ts";
import { generateApiKey } from "@/utils/hash.ts";
import {
    DuplicateProjectError,
    ProjectNotFoundError,
    UnauthorizedError,
} from "@/utils/errors.ts";

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

const getProjectById = async (
    id: string,
    userId: string,
): Promise<ProjectDTO> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new ProjectNotFoundError();
    }

    const projectDTO = toProjectDTO(project);
    if (projectDTO.createdBy != userId) {
        throw new UnauthorizedError();
    }

    return projectDTO;
};

const updateProject = async (
    id: string,
    userId: string,
    projectUpdate: Partial<NewProject>,
): Promise<ProjectDTO> => {
    await getProjectById(id, userId);

    const project = await Project.findByIdAndUpdate(
        id,
        projectUpdate,
        { new: true },
    );

    if (!project) {
        throw new ProjectNotFoundError();
    }

    return toProjectDTO(project);
};

const generateProjectApiKey = async (
    id: string,
    userId: string,
): Promise<ProjectDTO> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new ProjectNotFoundError();
    }
    if (project.createdBy.toString() !== userId) {
        throw new UnauthorizedError();
    }

    const apiKey = generateApiKey();
    const updatedProject = await Project.findByIdAndUpdate(
        id,
        { apiKey },
        { new: true },
    );
    if (!updatedProject) {
        throw new ProjectNotFoundError();
    }

    return toProjectDTO(updatedProject);
};

const removeProjectApiKey = async (
    id: string,
    userId: string,
): Promise<ProjectDTO> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new ProjectNotFoundError();
    }
    if (project.createdBy.toString() !== userId) {
        throw new UnauthorizedError();
    }

    const updatedProject = await Project.findByIdAndUpdate(
        id,
        { $unset: { apiKey: "" } },
        { new: true },
    );
    if (!updatedProject) {
        throw new ProjectNotFoundError();
    }

    return toProjectDTO(updatedProject);
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
    updateProject,
    generateProjectApiKey,
    removeProjectApiKey,
    getProjectByApiKey,
};

export default projectService;
