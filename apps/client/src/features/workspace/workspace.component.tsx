import styles from './workspace.module.css';
import { useGetProjectsQuery } from '../../common/apiSlice';
import { parseError } from '../../common/parse-error';
import { useState } from 'react';
import { Project } from './models';
import { GenerateWebsiteComponent } from './generateWebsite.component';
import { useNavigate } from 'react-router-dom';
import { PersistenceService } from '../../common/persistence.service';
import { LoadingComponent } from '../../common/loading.component';

export const WorkspaceComponent = () => {
    const navigate = useNavigate();
    const { data: projects = [], isFetching, error } = useGetProjectsQuery();
    const [activeProject, setActiveProject] = useState<Project | null>();

    const handleDownloadComplete = () => {
        setActiveProject(null);
    };

    const onSignout = () => {
        PersistenceService.clearAuthState();
        navigate('/');
    };

    return (
        <>
            <main className={styles.mainWrapper}>
                <h2>My Projects</h2>
                {isFetching && <LoadingComponent />}
                {error && <p className="errorText">{parseError(error)}</p>}
                <div className="projectsWrapper">
                    {projects.map((project) => (
                        <li key={project.id} className={styles.projectItem}>
                            {project.notionName}
                            {project.id !== activeProject?.id && (
                                <div onClick={() => setActiveProject(project)} className={styles.generateBtn}>
                                    🚀
                                </div>
                            )}
                            {project.id === activeProject?.id && (
                                <GenerateWebsiteComponent
                                    projectId={project.id}
                                    onDownloadComplete={handleDownloadComplete}
                                />
                            )}
                        </li>
                    ))}
                </div>
            </main>
            <nav className={styles.navWrapper}>
                <button>Add project</button>
                <button>My projects</button>
                <button onClick={onSignout}>Sign out</button>
            </nav>
        </>
    );
};
