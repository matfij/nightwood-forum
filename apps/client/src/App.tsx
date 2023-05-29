import { Route, Routes } from 'react-router-dom';
import { SigninComponent } from './features/auth/signin.component';
import { SignupComponent } from './features/auth/signup.component';
import { ProtectedComponent } from './common/protected.component';
import { WorkspaceComponent } from './features/workspace/workspace.component';

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SigninComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/workspace" element={<ProtectedComponent />}>
                <Route index element={<WorkspaceComponent />}></Route>
            </Route>
        </Routes>
    );
};
