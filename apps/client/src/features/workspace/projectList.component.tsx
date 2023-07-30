import styles from './projectList.module.css';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../../common/loading.component';
import { parseError } from '../../common/parse-error';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { ProjectDto, useGenerateWebsiteMutation, useProjectsQuery, useSyncMutation } from '../../common/gql-client';
import { setProjects } from './projectsSlice';
import { UpdateProjectComponent } from './updateProject.component';

export const ProjectListComponent = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.projects.projects);
    const { data, loading, error } = useProjectsQuery();
    const [sync, { loading: syncLoading, error: syncError }] = useSyncMutation();
    const [generate, { loading: generateLoading, error: generateError }] = useGenerateWebsiteMutation();
    const [activeProject, setActiveProject] = useState<ProjectDto>();

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
                        <span className={styles.projectNameText}>{project.notionName}</span>
                        <button
                            onClick={() => onSync(project.id)}
                            disabled={syncLoading}
                            className={styles.projectActionBtn}
                        >
                            🔄 Sync
                        </button>
                        <button
                            onClick={() => onGenerateWebsite(project.id)}
                            disabled={generateLoading}
                            className={styles.projectActionBtn}
                        >
                            🚀 Gen
                        </button>
                        <button
                            onClick={() => setActiveProject(project)}
                            disabled={syncLoading || generateLoading}
                            className={styles.projectActionBtn}
                        >
                            ✏️ Edit
                        </button>
                    </li>
                ))}
            </div>
            {activeProject && (
                <UpdateProjectComponent project={activeProject} onHide={() => setActiveProject(undefined)} />
            )}
        </>
    );
};
