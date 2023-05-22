import { LoginComponent, LoginProps } from './features/auth/login.component';

export const App = () => {
    const loginProps: LoginProps = {
        hint: 'log to notion-gen',
        canRegister: true,
    };

    return <LoginComponent {...loginProps} />;
};
