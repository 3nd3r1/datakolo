import Repository from "@/models/repository.ts";
import {
    NewRepository,
    RepositoryDTO,
    toRepositoryDTO,
} from "@/validators/repository.ts";
import projectService from "@/services/project.ts";

export class DuplicateRepositoryError extends Error {}
export class RepositoryNotFoundError extends Error {}

const createRepository = async (
    newRepository: NewRepository,
): Promise<RepositoryDTO> => {
    const project = await projectService.getProjectById(newRepository.project);
    if (
        await Repository.findOne({
            name: newRepository.name,
            project: project.id,
        })
    ) {
        throw new DuplicateRepositoryError();
    }

    const createdRepository = new Repository(newRepository);
    await createdRepository.save();

    return toRepositoryDTO(createdRepository);
};

const getRepositoriesByProject = async (
    projectId: string,
): Promise<RepositoryDTO[]> => {
    const repositories = await Repository.find({ project: projectId });
    return repositories.map((repository) => toRepositoryDTO(repository));
};

const getRepositoryById = async (
    id: string,
): Promise<RepositoryDTO> => {
    const repository = await Repository.findById(id);
    if (!repository) {
        throw new RepositoryNotFoundError();
    }
    return toRepositoryDTO(repository);
};

const updateRepository = async (
    id: string,
    repositoryUpdate: Partial<NewRepository>,
): Promise<RepositoryDTO> => {
    if (repositoryUpdate.project) {
        await projectService.getProjectById(repositoryUpdate.project);
    }

    const repository = await Repository.findByIdAndUpdate(
        id,
        repositoryUpdate,
        { new: true },
    );

    if (!repository) {
        throw new RepositoryNotFoundError();
    }

    return toRepositoryDTO(repository);
};

const repositoryService = {
    createRepository,
    getRepositoriesByProject,
    getRepositoryById,
    updateRepository,
};

export default repositoryService;
