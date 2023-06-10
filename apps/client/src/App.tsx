import { Route, Routes } from 'react-router-dom';
import { SigninComponent } from './features/auth/signin.component';
import { SignupComponent } from './features/auth/signup.component';
import { WorkspaceComponent } from './features/workspace/workspace.component';
import { AddProjectComponent } from './features/workspace/addProject.component';
import { ProjectListComponent } from './features/workspace/projectList.component';

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SigninComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/workspace" element={<WorkspaceComponent />}>
                <Route index element={<ProjectListComponent />} />
                <Route path="addProject" element={<AddProjectComponent />} />
            </Route>
        </Routes>
    );
};
