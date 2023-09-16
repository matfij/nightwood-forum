import style from './projectConfig.module.css';
import { ProjectConfig, ProjectDto } from '../../../common/gql/gql-client';
import { isInternalField } from '../../../common/utils/is-internal-field';

export type ProjectConfigProps = {
    project: ProjectDto;
    onHide: () => void;
};

export const ProjectConfigComponent = ({ project, onHide }: ProjectConfigProps) => {
    const displayConfig = (config: ProjectConfig | null | undefined) => {
        if (!config) {
            return '---';
        }
        const configFields = [];
        for (const [key, val] of Object.entries(config)) {
            if (isInternalField(key)) {
                continue;
            }
            if (typeof val !== 'object') {
                configFields.push(<><p>{key}:</p><input defaultValue={val}></input></>)
                continue;
            }
            for (const [_key, _val] of Object.entries(val)) {
                if (isInternalField(_key)) {
                    continue;
                }
                configFields.push(<><p>{key}.{_key}:</p><input defaultValue={_val}></input></>)
            }
        }
        return configFields;
    };

    return (
        <div className="modalWrapper">
            <div className="modalContent">
                <h2>Configure {project.notionName}</h2>
                <div className="configWrapper">{displayConfig(project.config)}</div>
                <button disabled={false} type="submit" className={style.btnSave}>
                    Save
                </button>
                <button onClick={onHide} disabled={false} type="submit" className={style.btnSave}>
                    Exit
                </button>
            </div>
        </div>
    );
};
