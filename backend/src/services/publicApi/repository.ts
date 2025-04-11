import { RepositoryNotFoundError } from "@/utils/errors.ts";
import { RepositoryDTO, toRepositoryDTO } from "@/validators/repository.ts";
import Repository from "@/models/repository.ts";
import publicApiProjectService from "@/services/publicApi/project.ts";

const getRepositoryById = async (
    id: string,
    apiKey: string,
): Promise<RepositoryDTO> => {
    const repository = await Repository.findById(id);
    if (!repository) {
        throw new RepositoryNotFoundError();
    }

    const repositoryDTO = toRepositoryDTO(repository);
    await publicApiProjectService.getProjectById(repositoryDTO.project, apiKey);

    return repositoryDTO;
};

const publicApiRepositoryService = {
    getRepositoryById,
};

export default publicApiRepositoryService;
