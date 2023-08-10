import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);

export const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
    const router = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...router,
        useNavigate: vi.fn().mockReturnValue(navigateMock),
    };
});

export const dispatchMock = vi.fn((data) => console.log(data));
vi.mock('../../src/common/state/hooks', () => {
    const hooks = vi.importActual('../../src/common/state/hooks');
    return {
        ...hooks,
        useAppDispatch: vi.fn().mockReturnValue(dispatchMock),
    };
});
