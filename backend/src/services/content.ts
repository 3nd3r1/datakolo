import Content from "@/models/content.ts";
import {
    ContentDTO,
    NewContent,
    toContentDTO,
    validateContentData,
} from "@/validators/content.ts";
import repositoryService from "@/services/repository.ts";
import { ContentData } from "@/validators/content.ts";
import { ContentNotFoundError } from "@/utils/errors.ts";

const createContent = async (
    newContent: NewContent,
    userId: string,
): Promise<ContentDTO> => {
    const repository = await repositoryService.getRepositoryById(
        newContent.repository,
        userId,
    );

    validateContentData(newContent.data, repository.contentSchema);

    const createdContent = new Content(newContent);
    await createdContent.save();

    return toContentDTO(createdContent);
};

const getContentsByRepository = async (
    repositoryId: string,
    userId: string,
): Promise<ContentDTO[]> => {
    await repositoryService.getRepositoryById(repositoryId, userId);

    const contents = await Content.find({ repository: repositoryId });
    return contents.map((content) => toContentDTO(content));
};

const getContentById = async (
    id: string,
    userId: string,
): Promise<ContentDTO> => {
    const content = await Content.findById(id);
    if (!content) {
        throw new ContentNotFoundError();
    }

    const contentDTO = toContentDTO(content);
    await repositoryService.getRepositoryById(contentDTO.repository, userId);

    return contentDTO;
};

const updateContentData = async (
    id: string,
    data: ContentData,
    userId: string,
): Promise<ContentDTO> => {
    const content = await getContentById(id, userId);

    const repository = await repositoryService.getRepositoryById(
        content.repository,
        userId,
    );

    validateContentData(data, repository.contentSchema);

    const updatedContent = await Content.findByIdAndUpdate(id, { data });
    if (!updatedContent) {
        throw new ContentNotFoundError();
    }

    return toContentDTO(updatedContent);
};

const contentService = {
    createContent,
    getContentsByRepository,
    getContentById,
    updateContentData,
};

export default contentService;
