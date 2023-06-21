export interface ContentBlock {
    id: string;
    type: ContentBlockType;
    children: ContentBlock[];
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
