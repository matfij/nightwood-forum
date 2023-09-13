export class ProjectConfig {
    fontUrl!: string;
    fontColor!: string;
    fontFamily!: string;
    backgroundColor!: string;
    heading!: ProjectConfigBlock;
    paragraph!: ProjectConfigBlock;
}

export class ProjectConfigBlock {
    fontSize!: string;
    fontWeight!: string;
    margin!: string;
}
