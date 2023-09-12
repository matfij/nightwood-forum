import { ProjectDto, ProjectUpdateDto, useUpdateProjectMutation } from '../../../common/gql/gql-client';
import { useAppDispatch } from '../../../common/state/hooks';
import { parseError } from '../../../common/utils/parse-error';
import { updateProject as updateProjectState } from '../state/projectsSlice';
import style from './updateProject.module.css';
import { useForm } from 'react-hook-form';

export type UpdateProjectProps = {
    project: ProjectDto;
    onHide: () => void;
};

export const UpdateProjectComponent = ({ project, onHide }: UpdateProjectProps) => {
    const [updateProject, { loading, error }] = useUpdateProjectMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectUpdateDto>({
        defaultValues: {
            projectId: project.id,
            notionId: project.notionId,
            notionName: project.notionName,
            notionAccessCode: project.notionAccessCode,
        },
    });
    const dispatch = useAppDispatch();

    const onUpdateProject = async (data: ProjectUpdateDto) => {
        const res = await updateProject({ variables: { projectUpdateDto: { ...data } } });
        if (!res.data?.updateProject) {
            return;
        }
        dispatch(updateProjectState(res.data.updateProject));
        onHide();
    };

    return (
        <div className="modalWrapper">
            <div className="modalContent">
                <form onSubmit={handleSubmit((data) => onUpdateProject(data))}>
                    <h2>Update {project.notionName}</h2>
                    <fieldset>
                        <label htmlFor="notionId">Notion ID</label>
                        <input {...register('notionId', { required: true })} />
                        {errors.notionId && <p className="errorText">{errors.notionId.message}</p>}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="notionName">Notion name</label>
                        <input {...register('notionName', { required: true })} />
                        {errors.notionName && <p className="errorText">{errors.notionName.message}</p>}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="notionAccessCode">Notion access code</label>
                        <input {...register('notionAccessCode', { required: true })} type="password" />
                        {errors.notionAccessCode && <p className="errorText">{errors.notionAccessCode.message}</p>}
                    </fieldset>
                    {error && <p className="errorText">{parseError(error)}</p>}
                    <button disabled={loading} type="submit" className={style.btnSave}>
                        Save
                    </button>
                </form>
                <button onClick={onHide} disabled={loading} className={style.btnExit}>
                    Exit
                </button>
            </div>
        </div>
    );
};
