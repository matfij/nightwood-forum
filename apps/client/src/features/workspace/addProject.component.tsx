import styles from './addProject.module.css';
import { useForm } from 'react-hook-form';
import { ProjectCreateDto } from './models';
import { useAddProjectMutation } from './projectsApiSlice';
import { parseError } from '../../common/parse-error';
import { setProjects } from './workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { useNavigate } from 'react-router-dom';

export const AddProjectComponent = () => {
    const projects = useAppSelector((state) => state.projects.projects);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createProject, { isLoading, error }] = useAddProjectMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectCreateDto>();

    const onAddProject = async (data: ProjectCreateDto) => {
        const res = await createProject(data);
        if (!('data' in res)) {
            return;
        }
        dispatch(setProjects([...projects, res.data]));
        navigate('/workspace');
    };

    return (
        <form onSubmit={handleSubmit((data) => onAddProject(data))} className={styles.formWrapper}>
            <h2>Add a new project</h2>
            <fieldset>
                <label htmlFor="notionId">Notion ID</label>
                <input {...register('notionId', { required: true })} />
                {errors.notionId && <p className="errorText">Notion ID is required.</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="notionName">Notion name</label>
                <input {...register('notionName', { required: true })} />
                {errors.notionName && <p className="errorText">Notion name is required.</p>}
            </fieldset>
            <fieldset>
                <label htmlFor="notionAccessCode">Notion access code</label>
                <input {...register('notionAccessCode', { required: true })} type="password" />
                {errors.notionAccessCode && <p className="errorText">Notion access code is required.</p>}
            </fieldset>
            {error && <p className="errorText">{parseError(error)}</p>}
            <button disabled={isLoading} type="submit" className={styles.submitBtn}>
                Add
            </button>
        </form>
    );
};
