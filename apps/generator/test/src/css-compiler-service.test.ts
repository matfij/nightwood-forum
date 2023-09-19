import { CssCompilerService } from '../../src/features/generator/services/css-compiler-service';
import { PROJECT_CONFIG_DEFAULT } from '../../src/features/projects/data/project-config-default';
import { CSS_CHUNK, CSS_CHUNK_UNSUPPORTED } from '../stubs/css-chunk';

describe('CssCompilerService', () => {
    it('should compile a valid project config', () => {
        const chunk = CSS_CHUNK;
        const config = PROJECT_CONFIG_DEFAULT;

        const parsedChunk = CssCompilerService.compile(chunk, config);

        expect(parsedChunk).toMatchSnapshot();
    });

    it('should not replace unsupported tags', () => {
        const chunk = CSS_CHUNK_UNSUPPORTED;
        const config = PROJECT_CONFIG_DEFAULT;

        const parsedChunk = CssCompilerService.compile(chunk, config);

        expect(parsedChunk).toMatchSnapshot();
    });
});
