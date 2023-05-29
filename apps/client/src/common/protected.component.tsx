import { Component, ComponentType } from 'react';
import { useAppSelector } from './hooks';
import { Navigate, Outlet, Route } from 'react-router-dom';

// export interface ProtectedComponentProps {
//     component: ComponentType<ProtectedComponentProps>;
// }

export const ProtectedComponent = (props: any) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);

    return isAuth ? <Outlet /> : <Navigate to='/' />
};
