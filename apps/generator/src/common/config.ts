export const APP_PORT = process.env.APP_PORT || 13000;
export const APP_MAX_FORKS = 2;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
export const LOGS_DIR = '.logs';

export const BUS_URL = 'kafka:9092';
export const BUS_CLIENT_ID = 'generator-app';

export const NOTION_API_URL = 'https://api.notion.com';
export const NOTION_API_VERSION = '2022-02-22';

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
export const AWS_S3_BUCKET_ID = process.env.AWS_S3_BUCKET_ID || '';
export const AWS_DOWNLOAD_LINK_MAX_AGE_SECONDS = 3600;
