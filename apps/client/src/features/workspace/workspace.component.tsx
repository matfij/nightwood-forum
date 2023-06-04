import styles from './workspace.module.css';
import { useGetProjectsQuery } from '../../common/apiSlice';
import { Link } from 'react-router-dom';
import { parseError } from '../../common/parse-error';

export const WorkspaceComponent = () => {
    const { data: projects = [], isFetching, error } = useGetProjectsQuery('');

    return (
        <>
            <main>
                <h1>Workspace Component</h1>
                {isFetching && <p>fetching ...</p>}
                {error && <p className="errorText">{parseError(error)}</p>}
                {projects.map((project) => (
                    <li key={project.id} className={styles.projectItem}>{project.notionName}</li>
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
