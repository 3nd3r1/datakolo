import Repository from "@/models/repository.ts";
import {
    NewRepository,
    RepositoryDTO,
    toRepositoryDTO,
} from "@/validators/repository.ts";

export class DuplicateRepositoryError extends Error {}

const createRepository = async (
    newRepository: NewRepository,
): Promise<RepositoryDTO> => {
    if (
        await Repository.findOne({
            name: newRepository.name,
            project: newRepository.project,
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
): Promise<RepositoryDTO | undefined> => {
    const repository = await Repository.findById(id);
    if (!repository) {
        return undefined;
    }
    return toRepositoryDTO(repository);
};

const updateRepository = async (
    id: string,
    repositoryUpdate: Partial<NewRepository>,
): Promise<RepositoryDTO> => {
    const repository = await Repository.findByIdAndUpdate(
        id,
        repositoryUpdate,
        { new: true },
    );

    if (!repository) {
        throw new Error("Repository not found");
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
