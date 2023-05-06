export interface JwtPayload {
    id: string;
    username: string;
    isRefresh?: boolean;
}
