const logger = {
    info: (msg) => {
        if (!msg.includes('vite') && !msg.includes('press h to show help')) {
            console.log('\x1b[36m[INFO]\x1b[0m', msg);
        }
    },
    warn: (msg) => {
        if (!msg.includes('vite')) {
            console.warn('\x1b[33m[WARN]\x1b[0m', msg);
        }
    },
    warnOnce: (msg) => {
        if (!msg.includes('vite')) {
            console.warn('\x1b[33m[WARN]\x1b[0m', msg);
        }
    },
    error: (msg) => {
        console.error('\x1b[31m[ERROR]\x1b[0m', msg);
    },
    clearScreen: () => {
        console.clear();
    },
    hasWarned: false,
    hasErrorLogged: (error) => {
        console.error('\x1b[31m[ERROR]\x1b[0m', error);
        return false;
    }
}

export default logger;