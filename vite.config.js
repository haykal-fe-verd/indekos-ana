import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
            clientPort: 5173,
            protocol: "ws",
        },
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        laravel({
            input: ["resources/js/app.tsx", "resources/css/app.css"],
            refresh: true,
        }),
        react(),
    ],
});
