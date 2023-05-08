export const APP_PORT = parseInt(process.env.APP_PORT);
export const APP_API_SCHEMA_PATH = 'swagger.json';
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRE_TIME_SECONDS = 15 * 60;
export const JWT_REFRESH_TOKEN_EXPIRE_TIME_SECONDS = 24 * 60 * 60;

export const DB_TYPE = 'postgres';
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const GENERATOR_APP_URL = process.env.GENERATOR_APP_URL;
