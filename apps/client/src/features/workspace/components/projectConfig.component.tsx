import style from './projectConfig.module.css';
import {
    ProjectConfig,
    ProjectConfigUpdateDto,
    ProjectDto,
    useUpdateProjectConfigMutation,
} from '../../../common/gql/gql-client';
import { isInternalField } from '../../../common/utils/is-internal-field';
import { useAppDispatch } from '../../../common/state/hooks';
import { useForm } from 'react-hook-form';
import { updateProject } from '../state/projectsSlice';
import { parseError } from '../../../common/utils/parse-error';

export type ProjectConfigProps = {
    project: ProjectDto;
    onHide: () => void;
};

export const ProjectConfigComponent = ({ project, onHide }: ProjectConfigProps) => {
    const [updateProjectConfig, { loading, error }] = useUpdateProjectConfigMutation();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<ProjectConfigUpdateDto>({
        defaultValues: {
            projectId: project.id,
        },
    });

    const displayConfigFields = (config: ProjectConfig | null | undefined) => {
        if (!config) {
            return '---';
        }
        const configFields = [];
        for (const [key, val] of Object.entries(config)) {
            if (isInternalField(key)) {
                continue;
            }
            if (typeof val !== 'object') {
                const fullKey = `config.${key}`;
                configFields.push(
                    <fieldset key={fullKey} className={style.mainField}>
                        <label htmlFor={fullKey}>
                            <b>{key}</b>
                        </label>
                        <input {...register(fullKey as any)} defaultValue={val} />
                    </fieldset>,
                );
                continue;
            }
            configFields.push(
                <div key={key} className={style.mainField}>
                    <label htmlFor={key}>{key}</label>
                </div>,
            );
            for (const [_key, _val] of Object.entries(val)) {
                if (isInternalField(_key)) {
                    continue;
                }
                const fullKey = `config.${key}.${_key}`;
                configFields.push(
                    <fieldset key={fullKey} className={style.nestedField}>
                        <label htmlFor={fullKey}>{_key}</label>
                        <input {...register(fullKey as any)} defaultValue={_val} />
                    </fieldset>,
                );
            }
        }
        return configFields;
    };

    const onUpdateProjectConfig = async (data: ProjectConfigUpdateDto) => {
        const res = await updateProjectConfig({ variables: { projectConfigUpdateDto: { ...data } } });
        if (!res.data?.updateProjectConfig) {
            return;
        }
        dispatch(updateProject(res.data.updateProjectConfig));
        onHide();
    };

    return (
        <div className="modalWrapper">
            <div className="modalContent">
                <form onSubmit={handleSubmit((data) => onUpdateProjectConfig(data))} className='formWrapper'>
                    <h2>Configure {project.notionName}</h2>
                    {displayConfigFields(project.config)}
                    {error && <p className="errorText">{parseError(error)}</p>}
                    <button disabled={loading} type="submit" className={style.btnSave}>
                        Save
                    </button>
                </form>
                <button onClick={onHide} disabled={false} type="submit" className={style.btnSave}>
                    Exit
                </button>
            </div>
        </div>
    );
};
