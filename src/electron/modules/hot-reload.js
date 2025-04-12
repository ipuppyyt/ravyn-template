import { fileURLToPath } from 'url';
import { app } from 'electron';
import chokidar from 'chokidar';
import path from 'path';

let mainWindow = null;
let isReloading = false;

/**
 * Configure hot reload for the main process
 * @param {BrowserWindow} browserWindow
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function configureHotReload(browserWindow) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    return;
  }

  mainWindow = browserWindow;  
  const electronDir = path.join(__dirname, '..');
  
  const watcher = chokidar.watch(electronDir, {
    // add nodemodules and runner.cjs to the ignored list
    ignored: [/\bnode_modules\b/, /\brunner.cjs\b/],
    persistent: true
  });

  watcher.on('change', (filePath) => {
    if (isReloading) return;
    
    if (filePath.includes('hot-reload.cjs')) return;
    
    console.log(`🔄 File ${path.basename(filePath)} has been changed. Reloading...`);

    isReloading = true;

    try {
      delete require.cache[require.resolve(filePath)];

      const fileExt = path.extname(filePath);
    
    if (fileExt === '.cjs') {
      console.log(`🔄 ${path.basename(filePath)} changed, reloading...`);
      
      try {
        delete require.cache[require.resolve(filePath)];
        
        if (filePath.includes('main.cjs')) {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('main-process-reloading');
            mainWindow.close();
          }
          app.relaunch();
          app.exit(0);
        } else {
          const module = require(filePath);
          if (typeof module.setApplicationMenu === 'function') {
            module.setApplicationMenu();
          }
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.reload();
          }
        }
      } catch (error) {
        console.error(`Error reloading ${path.basename(filePath)}:`, error);
      }
    }
    } catch (error) {
      console.error('Error during hot reload:', error);
    } finally {
      isReloading = false;
    }
  });
}

export { configureHotReload };