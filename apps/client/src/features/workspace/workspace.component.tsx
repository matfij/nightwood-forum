import styles from './workspace.module.css';
import { useGetProjectsQuery } from '../../common/apiSlice';
import { Link } from 'react-router-dom';
import { parseError } from '../../common/parse-error';
import { useState } from 'react';
import { Project } from './models';
import { GenerateWebsiteComponent } from './generateWebsite.component';

export const WorkspaceComponent = () => {
    const { data: projects = [], isFetching, error } = useGetProjectsQuery();
    const [activeProject, setActiveProject] = useState<Project | null>();

    const handleDownloadComplete = () => {
        setActiveProject(null);
    };

    return (
        <>
            <main>
                <h1>My Projects</h1>
                {isFetching && <p>fetching ...</p>}
                {error && <p className="errorText">{parseError(error)}</p>}
                {projects.map((project) => (
                    <li key={project.id} className={styles.projectItem}>
                        {project.notionName} <button onClick={() => setActiveProject(project)}>Generate</button>
                        {project.id === activeProject?.id && (
                            <GenerateWebsiteComponent
                                projectId={project.id}
                                onDownloadComplete={handleDownloadComplete}
                            />
                        )}
                    </li>
                ))}
            </main>
            <nav>
                <button className="">Add project</button>
                <button className="">My projects</button>
                <Link to={'/'}>Sign out</Link>
            </nav>
        </>
    );
};
