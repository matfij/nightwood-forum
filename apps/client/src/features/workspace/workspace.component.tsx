import styles from './workspace.module.css';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { PersistenceService } from '../../common/persistence.service';
import { useAppSelector } from '../../common/hooks';
import { useEffect } from 'react';

export const WorkspaceComponent = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    useEffect(() => {
        if (!isAuth) {
            onSignout();
        }
    });

    const onSignout = () => {
        PersistenceService.clearAuthState();
        navigate('/');
    };

    return (
        <>
            <main className={styles.mainWrapper}>
                <Outlet />
            </main>
            <nav className={styles.navWrapper}>
                <Link to="/workspace" className="btnLink">My projects</Link>
                <Link to="/workspace/addProject" className="btnLink">Add project</Link>
                <button onClick={onSignout}>Sign out</button>
            </nav>
        </>
    );
};
