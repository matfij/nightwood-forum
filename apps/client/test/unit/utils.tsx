import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../src/common/state/store';

export const renderWithProviders = (component: ReactNode, gqlMocks: MockedResponse<Record<string, any>>[] = []) => {
    return render(
        <Provider store={store}>
            <MockedProvider mocks={gqlMocks}>
                <MemoryRouter>{component}</MemoryRouter>
            </MockedProvider>
        </Provider>,
    );
};
