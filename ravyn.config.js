import { defineWindowConfig } from "ravyn-framework";

export default defineWindowConfig({
    build: {
        renderer: './dist/renderer'
    },
    title: 'Ravyn Config',
    width: 1200,
    height: 600,
    resizable: true,
    maximizable: true,
    minimizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
});
