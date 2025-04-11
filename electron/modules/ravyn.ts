import { version } from '../../package.json';
import type { Plugin } from 'vite';


export function ravyn(): Plugin {
  return {
    name: 'ravyn-branding',
    configureServer(server) {
      console.clear();
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        const message = args.join(' ');
        if (message.includes('vite ') || 
            message.includes('press h to show help') ||
            message.includes('VITE ') ||
            message.includes('ready in') ||
            message.includes('Local:') ||
            message.includes('➜  Local:   http://localhost:8181/') ||
            message.includes('➜  Network: use --host to expose') ||
            message.includes('Network:')) {
          return;
        }
        originalConsoleLog(...args);
      };

      // Display custom banner
      setTimeout(() => {
        console.clear();
        console.log('\x1b[36m%s\x1b[0m', `RAVYN ${version} `);
        console.log(`📡 Local:   http://localhost:${server.config.server.port}`);
        console.log('🛠  Hot Module Replacement: Active');
        console.log('🔥 File watching enabled\n');
      }, 100);
    }
  };
}