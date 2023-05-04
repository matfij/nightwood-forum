export interface ContentBlock {
    type: ContentBlockType;
    childs?: ContentBlock[];
    textContent?: string;
    fileUrl?: string;
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
