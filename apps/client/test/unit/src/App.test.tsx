import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../../src/App';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../src/common/state/store';

describe('App', () => {
    it('just runs', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>,
        );
        expect(screen.getByTestId('test-app-name')).toHaveTextContent('NotionGen');
    });
});
