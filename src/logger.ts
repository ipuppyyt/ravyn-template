interface Logger {
    info(msg: string): void;
    warn(msg: string): void;
    warnOnce(msg: string): void;
    error(msg: string): void;
    clearScreen(): void;
    hasWarned: boolean;
    hasErrorLogged(error: unknown): boolean;
}

export const logger: Logger = {
    info: (msg: string) => {
        if (!msg.includes('vite') && !msg.includes('press h to show help')) {
            console.log('\x1b[36m[INFO]\x1b[0m', msg);
        }
    },
    warn: (msg: string) => {
        if (!msg.includes('vite')) {
            console.warn('\x1b[33m[WARN]\x1b[0m', msg);
        }
    },
    warnOnce: (msg: string) => {
        if (!msg.includes('vite')) {
            console.warn('\x1b[33m[WARN]\x1b[0m', msg);
        }
    },
    error: (msg: string) => {
        console.error('\x1b[31m[ERROR]\x1b[0m', msg);
    },
    clearScreen: () => {
        console.clear();
    },
    hasWarned: false,
    hasErrorLogged: (error: unknown) => {
        console.error('\x1b[31m[ERROR]\x1b[0m', error);
        return false;
    }
};