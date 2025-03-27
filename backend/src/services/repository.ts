import Repository from "@/models/repository.ts";
import {
    NewRepository,
    RepositoryDTO,
    toRepositoryDTO,
} from "@/validators/repository.ts";
import projectService from "@/services/project.ts";
import {
    DuplicateRepositoryError,
    RepositoryNotFoundError,
} from "@/utils/errors.ts";

const createRepository = async (
    newRepository: NewRepository,
    userId: string,
): Promise<RepositoryDTO> => {
    const project = await projectService.getProjectById(
        newRepository.project,
        userId,
    );

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
    userId: string,
): Promise<RepositoryDTO[]> => {
    await projectService.getProjectById(projectId, userId);

    const repositories = await Repository.find({ project: projectId });
    return repositories.map((repository) => toRepositoryDTO(repository));
};

const getRepositoryById = async (
    id: string,
    userId: string,
): Promise<RepositoryDTO> => {
    const repository = await Repository.findById(id);
    if (!repository) {
        throw new RepositoryNotFoundError();
    }

    const repositoryDTO = toRepositoryDTO(repository);

    await projectService.getProjectById(repositoryDTO.project, userId);

    return repositoryDTO;
};

const updateRepository = async (
    id: string,
    repositoryUpdate: Partial<NewRepository>,
    userId: string,
): Promise<RepositoryDTO> => {
    await getRepositoryById(id, userId);

    if (repositoryUpdate.project) {
        await projectService.getProjectById(repositoryUpdate.project, userId);
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
