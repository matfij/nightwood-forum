import styles from './projectList.module.css';
import { useEffect, useState } from 'react';
import { UpdateProjectComponent } from './updateProject.component';
import { useAppDispatch, useAppSelector } from '../../../common/state/hooks';
import { LoadingComponent } from '../../../common/components/loading.component';
import { parseError } from '../../../common/utils/parse-error';
import { setProjects } from '../state/projectsSlice';
import {
    ProjectDto,
    useProjectsQuery,
    useSyncMutation,
    useGenerateWebsiteMutation,
} from '../../../common/gql/gql-client';
import { ProjectConfigComponent } from './projectConfig.component';

export const ProjectListComponent = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector<Array<ProjectDto>>((state) => state.projects.projects);
    const { data, loading, error } = useProjectsQuery({ fetchPolicy: 'no-cache' });
    const [sync, { loading: syncLoading, error: syncError }] = useSyncMutation();
    const [generate, { loading: generateLoading, error: generateError }] = useGenerateWebsiteMutation();
    const [activeProject, setActiveProject] = useState<ProjectDto>();
    const [activeProjectConfig, setActiveProjectConfig] = useState<ProjectDto>();

    useEffect(() => {
        if (!data || projects.length) {
            return;
        }
        dispatch(setProjects(data.projects));
    }, [projects, data]);

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
                        <button
                            onClick={() => setActiveProjectConfig(project)}
                            disabled={generateLoading}
                            className={styles.projectActionBtn}
                        >
                            ⚙️ Config
                        </button>
                    </li>
                ))}
            </div>
            {activeProject && (
                <UpdateProjectComponent project={activeProject} onHide={() => setActiveProject(undefined)} />
            )}
            {activeProjectConfig && (
                <ProjectConfigComponent
                    project={activeProjectConfig}
                    onHide={() => setActiveProjectConfig(undefined)}
                />
            )}
        </>
    );
};
