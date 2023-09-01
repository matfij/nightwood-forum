import { ContentBlock, ContentBlockType } from '../../src/features/generator/models/content-block';

export const HEADING_BLOCK: ContentBlock = {
    id: 'b-1',
    type: ContentBlockType.Heading,
    textContent: 'A Big Title',
    children: [],
};

export const PARAGRAPH_BLOCK: ContentBlock = {
    id: 'b-2',
    type: ContentBlockType.Paragraph,
    textContent:
        'Identify the Purpose: Understand the purpose of the database and the specific requirements it needs to fulfill.',
    children: [],
};

export const IMAGE_BLOCK: ContentBlock = {
    id: 'b-3',
    type: ContentBlockType.Image,
    filePath: './assets/paint.jpg',
    children: [],
};

export const CALLOUT_BLOCK: ContentBlock = {
    id: 'b-4',
    type: ContentBlockType.Callout,
    filePath: './assets/paint.jpg',
    children: [
        {
            id: 'b-41',
            type: ContentBlockType.Heading,
            textContent: 'A Nested Title',
            children: [],
        },
        {
            id: 'b-42',
            type: ContentBlockType.Image,
            filePath: './assets/drawing.jpg',
            children: [],
        },
    ],
};
