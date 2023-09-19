import { HtmlCompilerService } from '../../src/features/generator/services/html-compiler-service';
import { CALLOUT_BLOCK, HEADING_BLOCK, IMAGE_BLOCK, PARAGRAPH_BLOCK } from '../stubs/content-blocks';

describe('HtmlCompilerService', () => {
    it('should compile a simple website', () => {
        const blocks = [HEADING_BLOCK, PARAGRAPH_BLOCK, IMAGE_BLOCK, CALLOUT_BLOCK];

        const html = HtmlCompilerService.compile(blocks);

        expect(html).toMatchSnapshot();
    });
});
