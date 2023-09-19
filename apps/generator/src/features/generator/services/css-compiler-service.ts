import { ProjectConfig } from '../../projects/models/project-config';

export class CssCompilerService {
    static compile(chunk: string, config: ProjectConfig): string {
        for (const [key, val] of Object.entries(config)) {
            if (typeof val === 'object') {
                for (const [_key, _val] of Object.entries(val)) {
                    const fullKey = `#${key}.${_key}`;
                    chunk = chunk.replace(fullKey, `${_val}`);
                }
                continue;
            }
            const fullKey = `#${key}`;
            chunk = chunk.replace(fullKey, `${val}`);
        }
        return chunk;
    }
}
