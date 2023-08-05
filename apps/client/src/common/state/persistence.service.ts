import { AuthState } from "../../features/auth/state/authSlice";

export class PersistenceService {
    static readonly AUTH_STATE_KEY = 'auth-state';

    static setAuthState(data: AuthState) {
        if (!localStorage) {
            return;
        }
        localStorage.setItem(this.AUTH_STATE_KEY, JSON.stringify(data));
    }

    static getAuthState(): AuthState | null {
        if (!localStorage) {
            return null;
        }
        const data = localStorage.getItem(this.AUTH_STATE_KEY);
        if (!data) {
            return null;
        }
        return JSON.parse(data) as AuthState;
    }

    static clearAuthState() {
        if (!localStorage) {
            return;
        }
        localStorage.removeItem(this.AUTH_STATE_KEY);
    }
}
