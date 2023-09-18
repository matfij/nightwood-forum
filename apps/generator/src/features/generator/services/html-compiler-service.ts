import { ContentBlock, ContentBlockType } from '../models/content-block';

export class HtmlCompilerService {
    static compile(blocks: ContentBlock[]): string {
        let content = '';
        blocks.forEach((block) => {
            content += `\n${this.compileBlock(block)}`;
        });
        return content;
    }

    private static compileBlock(block: ContentBlock): string {
        let content = '';
        let childrenContent = block.children.reduce((prev, curr) => prev + `\n${this.compileBlock(curr)}`, '');
        switch (block.type) {
            case ContentBlockType.Heading: {
                content += `<h1 class="heading-block">${block.textContent}</h1>`;
                break;
            }
            case ContentBlockType.Paragraph: {
                content += `<p class="paragraph-block">${block.textContent}${childrenContent}</p>`;
                break;
            }
            case ContentBlockType.Divider: {
                content += `<hr class="divider-block" />`;
                break;
            }
            case ContentBlockType.Callout: {
                content += `<div class="callout-block">🎉 ${block.textContent}${childrenContent}</div>`;
                break;
            }
            case ContentBlockType.ListItem: {
                content += `<li class="list-item-block">${block.textContent}<ul>${childrenContent}</ul></li>`;
                break;
            }
            case ContentBlockType.TodoItem: {
                content += `<p class="todo-block">${block.checked ? '✓' : '☐'} ${block.textContent}${childrenContent}</p>`;
                break;
            }
            case ContentBlockType.Image: {
                content += `<img class="image-block" src="${block.filePath}">`;
                break;
            }
            case ContentBlockType.File: {
                content += `<a class="file-block" href="${block.filePath}" download>📁</a>`;
                break;
            }
            default: {
                content += `<p>**Unsupported block (${block.textContent})**</p>`;
                break;
            }
        }
        return content;
    }
}
