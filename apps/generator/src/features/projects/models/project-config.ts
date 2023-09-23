export class ProjectConfig {
    fontUrl!: string;
    fontColor!: string;
    fontFamily!: string;
    backgroundColor!: string;
    heading!: ProjectConfigBlock;
    paragraph!: ProjectConfigBlock;
    divider!: ProjectConfigBlock;
    callout!: ProjectConfigBlock;
    listItem!: ProjectConfigBlock;
    todoItem!: ProjectConfigBlock;
    image!: ProjectConfigBlock;
    file!: ProjectConfigBlock;
}

export class ProjectConfigBlock {
    fontSize!: string;
    fontWeight!: string;
    margin!: string;
}
