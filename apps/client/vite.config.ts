/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        watch: {
            usePolling: true,
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test/unit/setup.ts'],
    },
});
