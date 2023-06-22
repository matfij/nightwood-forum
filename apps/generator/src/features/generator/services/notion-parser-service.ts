import fs from 'fs';
import axios from 'axios';
import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { ContentBlock, ContentBlockType } from '../models/content-block';
import { PROJECT_ASSETS_PATH } from '../utils/cache-paths';

export class NotionParserService {
    static async parseBlocks(projectId: string, notionBlocks: BlockObjectResponse[]): Promise<ContentBlock[]> {
        const parsedBlocks: ContentBlock[] = [];
        for (let notionBlock of notionBlocks) {
            try {
                const newBlock = await this.parseBlock(projectId, notionBlock);
                const parentBlock = this.findParent(this.getParentId(notionBlock), parsedBlocks);
                if (parentBlock) {
                    parentBlock.children.push(newBlock);
                } else {
                    parsedBlocks.push(newBlock);
                }
            } catch (err) {
                console.log(err);
            }
        }
        return parsedBlocks;
    }

    private static async parseBlock(projectId: string, block: BlockObjectResponse): Promise<ContentBlock> {
        const blockBlueprint: Omit<ContentBlock, 'type'> = {
            id: block.id,
            children: [],
        };
        switch (block.type) {
            case 'heading_1': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Heading,
                    textContent: this.getBlockText(block.heading_1.rich_text),
                };
            }
            case 'paragraph': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Paragraph,
                    textContent: this.getBlockText(block.paragraph.rich_text),
                };
            }
            case 'divider': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Divider,
                };
            }
            case 'callout': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Callout,
                    textContent: `${block.callout.icon} ${this.getBlockText(block.callout.rich_text)}`,
                };
            }
            case 'bulleted_list_item': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.ListItem,
                    textContent: this.getBlockText(block.bulleted_list_item.rich_text),
                    children: [],
                };
            }
            case 'to_do': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.TodoItem,
                    checked: block.to_do.checked,
                };
            }
            case 'image': {
                const filePath = await this.downloadFile(projectId, block);
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Image,
                    filePath: filePath,
                };
            }
            case 'file': {
                const filePath = await this.downloadFile(projectId, block);
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Image,
                    filePath: filePath,
                };
            }
            default: {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Unknown,
                    textContent: block.type,
                };
            }
        }
    }

    private static getParentId(block: BlockObjectResponse): string {
        switch (block.parent.type) {
            case 'block_id':
                return block.parent.block_id;
            case 'page_id':
                return block.parent.page_id;
            case 'database_id':
                return block.parent.database_id;
            case 'workspace':
                return '';
        }
    }

    private static findParent(parentId: string, blocks: ContentBlock[]): ContentBlock | undefined {
        for (const block of blocks) {
            if (parentId === block.id) {
                return block;
            }
            const parent = this.findParent(parentId, block.children);
            if (parent) {
                return parent;
            }
        }
        return undefined;
    }

    private static getBlockText(richText: RichTextItemResponse[]): string {
        return richText.reduce((prev, curr) => prev + curr.plain_text, '');
    }

    private static async downloadFile(projectId: string, block: BlockObjectResponse): Promise<string | undefined> {
        let fileUrl = this.getFileUrl(block);
        console.log('start download', fileUrl);
        if (!fileUrl) {
            return;
        }
        const filePath = `${PROJECT_ASSETS_PATH(projectId)}/${this.getFileName(fileUrl)}`;
        console.log(filePath);
        const res = await axios.get(fileUrl, { responseType: 'stream' });
        const writeStram = fs.createWriteStream(filePath);
        res.data.pipe(writeStram);
        return filePath;
    }

    private static getFileUrl(block: BlockObjectResponse): string | undefined {
        switch (block.type) {
            case 'file': {
                return block.file.type === 'file' ? block.file.file.url : block.file.external.url;
            }
            case 'image': {
                return block.image.type === 'file' ? block.image.file.url : block.image.external.url;
            }
            default: {
                return;
            }
        }
    }

    private static getFileName(fileUrl: string): string {
        const url = new URL(fileUrl);
        const path = url.pathname;
        const segments = path.split('/');
        const lastSegment = segments[segments.length - 1];
        const fileName = lastSegment.split('?')[0];
        return fileName;
    }
}
