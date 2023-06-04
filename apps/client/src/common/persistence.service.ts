import { AuthState } from '../features/auth/authSlice';

export class PersistenceService {
    static readonly AUTH_STATE_KEY = 'auth-state';

    static setAuthState(data: AuthState) {
        localStorage.setItem(this.AUTH_STATE_KEY, JSON.stringify(data));
    }

    static getAuthState(): AuthState | null {
        const data = localStorage.getItem(this.AUTH_STATE_KEY);
        if (!data) {
            return null;
        }
        return JSON.parse(data) as AuthState;
    }

    static clearAuthState() {
        localStorage.removeItem(this.AUTH_STATE_KEY);
    }
}
