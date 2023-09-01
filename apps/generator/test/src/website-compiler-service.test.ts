import { WebsiteCompilerService } from '../../src/features/generator/services/website-compiler-service';
import { CALLOUT_BLOCK, HEADING_BLOCK, IMAGE_BLOCK, PARAGRAPH_BLOCK } from '../stubs/content-blocks';

describe('WebsiteCompilerService', () => {
    it('should compile a simple website', () => {
        const blocks = [HEADING_BLOCK, PARAGRAPH_BLOCK, IMAGE_BLOCK, CALLOUT_BLOCK];

        const html = WebsiteCompilerService.compile(blocks);

        expect(html).toMatchSnapshot()
    });
});
