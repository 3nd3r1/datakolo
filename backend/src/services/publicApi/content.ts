import { ContentDTO, toContentDTO } from "@/validators/content.ts";
import publicApiRepositoryService from "@/services/publicApi/repository.ts";
import Content from "@/models/content.ts";
import { ContentNotFoundError } from "@/utils/errors.ts";

// TODO: Use a apiKey type instead of string
const getContentsByRepository = async (
    repositoryId: string,
    apiKey: string,
): Promise<ContentDTO[]> => {
    await publicApiRepositoryService.getRepositoryById(repositoryId, apiKey);

    const contents = await Content.find({ repository: repositoryId });
    return contents.map((content) => toContentDTO(content));
};

const getContentById = async (
    id: string,
    apiKey: string,
): Promise<ContentDTO> => {
    const content = await Content.findById(id);
    if (!content) {
        throw new ContentNotFoundError();
    }

    const contentDTO = toContentDTO(content);
    await publicApiRepositoryService.getRepositoryById(
        contentDTO.repository,
        apiKey,
    );

    return contentDTO;
};

const publicApiContentService = {
    getContentsByRepository,
    getContentById,
};

export default publicApiContentService;
