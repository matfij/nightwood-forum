import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SigninComponent } from '../../../../../../src/features/auth/components/signin.component';
import { renderWithProviders } from '../../../../utils';
import { navigateMock } from '../../../../setup';

describe('Signin Component', () => {
    it('renders component', () => {
        renderWithProviders(<SigninComponent />);
        expect(screen.getByTestId('test-app-name')).toHaveTextContent('NotionGen');
    });

    it('submits form correctly', async () => {
        const signinMock = vi
            .fn()
            .mockResolvedValue({ data: { username: 'test', accessToken: 'token', refreshToken: 'token' } });
        vi.mock('../../../common/gql/gql-client', () => ({
            useSigninMutation: signinMock,
        }));
        renderWithProviders(<SigninComponent />);

        fireEvent.change(screen.getByTestId('test-username-input'), { target: { value: 'test' } });
        fireEvent.change(screen.getByTestId('test-password-input'), { target: { value: '1234' } });
        fireEvent.click(screen.getByTestId('test-submit-btn'));

        await waitFor(() => {
            expect(signinMock).toHaveBeenCalledWith({
                variables: {
                    signinDto: { username: 'test', password: '1234' },
                },
            });
            expect(navigateMock).toHaveBeenCalledWith('/workspace');
        });
    });

    it('navigates to signup page', async () => {
        renderWithProviders(<SigninComponent />);

        fireEvent.click(screen.getByTestId('test-nav-btn'));

        expect(navigateMock).toHaveBeenCalledWith('/signup');
    });
});
