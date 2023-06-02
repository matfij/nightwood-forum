import { useAppSelector } from './hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedComponent = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    return isAuth ? <Outlet /> : <Navigate to='/' />
};
