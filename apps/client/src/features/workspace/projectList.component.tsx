import styles from './projectList.module.css';
import { useEffect } from 'react';
import { LoadingComponent } from '../../common/loading.component';
import { parseError } from '../../common/parse-error';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { useGenerateWebsiteMutation, useProjectsQuery, useSyncMutation } from '../../common/gql-client';
import { setProjects } from './projectsSlice';

export const ProjectListComponent = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.projects.projects);
    const { data, loading, error } = useProjectsQuery();
    const [sync, { loading: syncLoading, error: syncError }] = useSyncMutation();
    const [generate, { loading: generateLoading, error: generateError }] = useGenerateWebsiteMutation();

    useEffect(() => {
        if (!data) {
            return;
        }
        dispatch(setProjects(data.projects));
    }, [dispatch, data, error, loading]);

    const onSync = async (id: string) => {
        await sync({ variables: { id: id } });
    };

    const onGenerateWebsite = async (id: string) => {
        const response = await generate({ variables: { id: id } });
        if (!response.data || !response.data.generateWebsite) {
            return;
        }
        window.open(response.data.generateWebsite, '_blank');
    };

    return (
        <>
            <h2>My Projects</h2>
            {loading && <LoadingComponent />}
            {error && <p className="errorText">{parseError(error)}</p>}
            <div className="projectsWrapper">
                {projects.map((project) => (
                    <li key={project.id} className={styles.projectItem}>
                        {project.notionName}
                        <button
                            onClick={() => onSync(project.id)}
                            disabled={syncLoading}
                            className={styles.generateBtn}
                        >
                            🔄
                        </button>
                        <button
                            onClick={() => onGenerateWebsite(project.id)}
                            disabled={generateLoading}
                            className={styles.generateBtn}
                        >
                            🚀
                        </button>
                    </li>
                ))}
            </div>
        </>
    );
};
