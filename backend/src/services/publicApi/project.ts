import Project from "@/models/project.ts";
import { ProjectDTO, toProjectDTO } from "@/validators/project.ts";
import { ProjectNotFoundError, UnauthorizedError } from "@/utils/errors.ts";

const getProjectById = async (
    id: string,
    apiKey: string,
): Promise<ProjectDTO> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new ProjectNotFoundError();
    }

    if (!project.verifyApiKey(apiKey)) {
        throw new UnauthorizedError();
    }

    return toProjectDTO(project);
};

const publicApiProjectService = {
    getProjectById,
};

export default publicApiProjectService;
