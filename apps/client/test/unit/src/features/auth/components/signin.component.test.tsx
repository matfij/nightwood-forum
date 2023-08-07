import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SigninComponent } from '../../../../../../src/features/auth/components/signin.component';
import { renderWithProviders } from '../../../../utils';
import { dispatchMock, navigateMock } from '../../../../setup';
import { signinErrorMock, signinSuccessMock } from '../../../../../mocks/gql';

describe('Signin Component', () => {
    it('renders component', () => {
        renderWithProviders(<SigninComponent />);
        expect(screen.getByTestId('test-app-name')).toHaveTextContent('NotionGen');
    });

    it('signs in correctly', async () => {
        const singinMock = signinSuccessMock('test', '1234');
        renderWithProviders(<SigninComponent />, [singinMock]);

        fireEvent.change(screen.getByTestId('test-username-input'), { target: { value: 'test' } });
        fireEvent.change(screen.getByTestId('test-password-input'), { target: { value: '1234' } });
        fireEvent.click(screen.getByTestId('test-submit-btn'));

        await waitFor(() => {
            // expect(dispatchMock).toHaveBeenCalledWith(singinMock.result.data.signin);
            expect(navigateMock).toHaveBeenCalledWith('/workspace'); // todo - state leak?
        });
    });

    it('encounter error while signing in', async () => {
        const singinMock = signinErrorMock('test', '1234', 'signin error');
        renderWithProviders(<SigninComponent />, [singinMock]);

        fireEvent.change(screen.getByTestId('test-username-input'), { target: { value: 'test' } });
        fireEvent.change(screen.getByTestId('test-password-input'), { target: { value: '1234' } });
        fireEvent.click(screen.getByTestId('test-submit-btn'));

        await waitFor(() => {
            expect(screen.getByTestId('test-error-text')).toHaveTextContent('signin error');
            // expect(dispatchMock).not.toHaveBeenCalled();
            expect(navigateMock).not.toHaveBeenCalled();
        });
    });

    it('navigates to signup page', async () => {
        renderWithProviders(<SigninComponent />);

        fireEvent.click(screen.getByTestId('test-nav-btn'));

        expect(navigateMock).toHaveBeenCalledWith('/signup');
    });
});
