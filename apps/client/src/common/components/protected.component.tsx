import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../state/hooks';

export const ProtectedComponent = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    return isAuth ? <Outlet /> : <Navigate to='/' />
};
