import Content from "@/models/content.ts";
import {
    ContentDTO,
    NewContent,
    toContentDTO,
    validateContentData,
} from "@/validators/content.ts";
import repositoryService from "@/services/repository.ts";
import { ContentData } from "@/validators/content.ts";

export class ContentNotFoundError extends Error {}

const createContent = async (newContent: NewContent): Promise<ContentDTO> => {
    const repository = await repositoryService.getRepositoryById(
        newContent.repository,
    );

    validateContentData(newContent.data, repository.contentSchema);

    const createdContent = new Content(newContent);
    await createdContent.save();

    return toContentDTO(createdContent);
};

const getContentsByRepository = async (
    repositoryId: string,
): Promise<ContentDTO[]> => {
    const contents = await Content.find({ repository: repositoryId });
    return contents.map((content) => toContentDTO(content));
};

const getContentById = async (id: string): Promise<ContentDTO> => {
    const content = await Content.findById(id);
    if (!content) {
        throw new ContentNotFoundError();
    }
    return toContentDTO(content);
};

const updateContentData = async (
    id: string,
    data: ContentData,
): Promise<ContentDTO> => {
    const content = await getContentById(id);

    const repository = await repositoryService.getRepositoryById(
        content.repository,
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
