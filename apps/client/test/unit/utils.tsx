import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { gqlClient } from '../../src/common/gql/gql-auth';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../src/common/state/store';

export const renderWithProviders = (component: ReactNode) => {
    return render(
        <Provider store={store}>
            <ApolloProvider client={gqlClient}>
                <MemoryRouter>{component}</MemoryRouter>
            </ApolloProvider>
        </Provider>,
    );
};
