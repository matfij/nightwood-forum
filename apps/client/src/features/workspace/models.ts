export interface ProjectDto {
    id: string;
    userId: string;
    notionId: string;
    notionName: string;
    notionAccessCode: string;
    createdAt: number;
}

export interface ProjectCreateDto {
    notionId: string;
    notionName: string;
    notionAccessCode: string;
}
