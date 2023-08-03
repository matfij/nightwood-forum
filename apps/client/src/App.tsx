import { ApolloProvider } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import { SigninComponent } from './features/auth/components/signin.component';
import { AddProjectComponent } from './features/workspace/components/addProject.component';
import { gqlClient } from './common/gql/gql-auth';
import { SignupComponent } from './features/auth/components/signup.component';
import { ProjectListComponent } from './features/workspace/components/projectList.component';
import { WorkspaceComponent } from './features/workspace/components/workspace.component';


export const App = () => {
    return (
        <ApolloProvider client={gqlClient}>
            <Routes>
                <Route path="/" element={<SigninComponent />} />
                <Route path="/signup" element={<SignupComponent />} />
                <Route path="/workspace" element={<WorkspaceComponent />}>
                    <Route index element={<ProjectListComponent />} />
                    <Route path="addProject" element={<AddProjectComponent />} />
                </Route>
            </Routes>
        </ApolloProvider>
    );
};
