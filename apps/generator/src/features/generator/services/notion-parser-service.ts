import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { ContentBlock, ContentBlockType } from '../models/content-block';

export class NotionParserService {
    static async parseBlocks(blocks: BlockObjectResponse[]): Promise<ContentBlock[]> {
        const parsedBlocks: ContentBlock[] = [];
        for (let block of blocks) {
            try {
                const parsedBlock = await this.parseBlock(block);
                parsedBlocks.push(parsedBlock);
            } catch (err) {
                console.log(err);
            }
        }
        return parsedBlocks;
    }

    private static async parseBlock(block: BlockObjectResponse): Promise<ContentBlock> {
        switch (block.type) {
            case 'heading_1': {
                return {
                    type: ContentBlockType.Heading,
                    textContent: this.getBlockText(block.heading_1.rich_text),
                };
            }
            case 'paragraph': {
                return {
                    type: ContentBlockType.Paragraph,
                    textContent: this.getBlockText(block.paragraph.rich_text),
                };
            }
            case 'divider': {
                return {
                    type: ContentBlockType.Divider,
                };
            }
            case 'callout': {
                return {
                    type: ContentBlockType.Callout,
                    textContent: `${block.callout.icon} ${this.getBlockText(block.callout.rich_text)}`,
                };
            }
            case 'bulleted_list_item': {
                return {
                    type: ContentBlockType.ListItem,
                    textContent: this.getBlockText(block.bulleted_list_item.rich_text),
                    childs: [],
                };
            }
            case 'to_do': {
                return {
                    type: ContentBlockType.TodoItem,
                    checked: block.to_do.checked,
                };
            }
            case 'image': {
                return {
                    type: ContentBlockType.Image,
                    fileUrl: block.image.type === 'file' ? block.image.file.url : block.image.external.url,
                };
            }
            case 'file': {
                return {
                    type: ContentBlockType.Image,
                    fileUrl: block.file.type === 'file' ? block.file.file.url : block.file.external.url,
                };
            }
            default: {
                return {
                    type: ContentBlockType.Unknown,
                    textContent: block.type,
                };
            }
        }
    }

    private static getBlockText(richText: RichTextItemResponse[]): string {
        return richText.reduce((prev, curr) => prev + curr.plain_text, '');
    }
}
