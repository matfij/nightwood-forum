import { ContentBlock, ContentBlockType } from '../models/content-block';

export class WebsiteCompilerService {
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
                content += `<h1>${block.textContent}</h1>`;
                break;
            }
            case ContentBlockType.Paragraph: {
                content += `<p>${block.textContent}${childrenContent}</p>`;
                break;
            }
            case ContentBlockType.Divider: {
                content += `<hr />`;
                break;
            }
            case ContentBlockType.Callout: {
                content += `<div>🎉 ${block.textContent}${childrenContent}</div>`;
                break;
            }
            case ContentBlockType.ListItem: {
                content += `<li>${block.textContent}<ul>${childrenContent}</ul></li>`;
                break;
            }
            case ContentBlockType.TodoItem: {
                content += `<p>${block.checked ? '✓' : '☐'} ${block.textContent}${childrenContent}</p>`;
                break;
            }
            case ContentBlockType.Image: {
                content += `<img src="${block.filePath}">`;
                break;
            }
            case ContentBlockType.File: {
                content += `<a href="${block.filePath}" download>📁</a>`;
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
