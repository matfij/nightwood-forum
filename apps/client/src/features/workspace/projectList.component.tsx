import styles from './projectList.module.css';
import { useEffect, useState } from 'react';
import { ProjectDto } from './models';
import { LoadingComponent } from '../../common/loading.component';
import { parseError } from '../../common/parse-error';
import { GenerateWebsiteComponent } from './generateWebsite.component';
import { useGetProjectsQuery } from './projectsApiSlice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { setProjects } from './workspaceSlice';

export const ProjectListComponent = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector((state) => state.projects.projects);
    const { data = [], isFetching, error } = useGetProjectsQuery();
    const [activeProject, setActiveProject] = useState<ProjectDto | null>();

    useEffect(() => {
        if (!data) {
            return;
        }
        dispatch(setProjects(data));
    }, [data]);

    const handleDownloadComplete = () => {
        setActiveProject(null);
    };

    return (
        <>
            <h2>My Projects</h2>
            {isFetching && <LoadingComponent />}
            {error && <p className="errorText">{parseError(error)}</p>}
            <div className="projectsWrapper">
                {data.map((project) => (
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
