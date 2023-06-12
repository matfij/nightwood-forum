import styles from './addProject.module.css';
import { useForm } from 'react-hook-form';
import { ProjectCreateDto } from './models';

export const AddProjectComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectCreateDto>();

    const onAddProject = async (data: ProjectCreateDto) => {
        console.log(data);
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
            <button disabled={false} type="submit" className={styles.submitBtn}>
                Add
            </button>
        </form>
    );
};
