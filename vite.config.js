import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
            publicDirectory: 'public_html'
        }),

        react(),
    ],

    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "./resources/js/Assets"),
            "@styles": path.resolve(__dirname, "./resources/js/Styles"),
            "@routes": path.resolve(__dirname, "./resources/js/Routes"),
            "@components": path.resolve(__dirname, "./resources/js/Components"),
            "@layouts": path.resolve(__dirname, "./resources/js/Layouts"),
            "@widgets": path.resolve(__dirname, "./resources/js/Widgets"),
            "@pages": path.resolve(__dirname, "./resources/js/Pages"),
            "@context": path.resolve(__dirname, "./resources/js/Context"),
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '/resources/js/Styles/utils/index';`,
            },
        },
    },
});
