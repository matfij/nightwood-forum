import styles from './projectList.module.css';
import { useGetProjectsQuery } from '../../common/apiSlice';
import { useState } from 'react';
import { Project } from './models';
import { LoadingComponent } from '../../common/loading.component';
import { parseError } from '../../common/parse-error';
import { GenerateWebsiteComponent } from './generateWebsite.component';

export const ProjectListComponent = () => {
    const { data: projects = [], isFetching, error } = useGetProjectsQuery();
    const [activeProject, setActiveProject] = useState<Project | null>();

    const handleDownloadComplete = () => {
        setActiveProject(null);
    };

    return (
        <>
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
        </>
    );
};
