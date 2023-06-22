export interface ContentBlock {
    id: string;
    type: ContentBlockType;
    children: ContentBlock[];
    textContent?: string;
    filePath?: string;
    checked?: boolean;
}

export enum ContentBlockType {
    Heading,
    Paragraph,
    Divider,
    Callout,
    ListItem,
    TodoItem,
    Image,
    File,
    Unknown,
}
