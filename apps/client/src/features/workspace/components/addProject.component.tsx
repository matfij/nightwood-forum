import styles from './addProject.module.css';
import { useForm } from 'react-hook-form';
import { parseError } from '../../../common/utils/parse-error';
import { useAppDispatch, useAppSelector } from '../../../common/state/hooks';
import { useNavigate } from 'react-router-dom';
import { ProjectCreateDto, useCreateProjectMutation } from '../../../common/gql/gql-client';
import { setProjects } from '../state/projectsSlice';

export const AddProjectComponent = () => {
    const projects = useAppSelector((state) => state.projects.projects);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [createProject, { loading, error }] = useCreateProjectMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectCreateDto>();

    const onAddProject = async (data: ProjectCreateDto) => {
        const res = await createProject({ variables: { projectCreateDto: data } });
        if (!res.data) {
            return;
        }
        dispatch(setProjects([...projects, res.data.createProject]));
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
            <button disabled={loading} type="submit" className={styles.submitBtn}>
                Add
            </button>
        </form>
    );
};
