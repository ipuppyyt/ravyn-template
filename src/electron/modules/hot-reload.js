import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';
import { app } from 'electron';
import path from 'path';

const require = createRequire(import.meta.url);

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
    ignored: [/\bnode_modules\b/, /\brunner.js\b/],
    persistent: true
  });

  watcher.on('change', async (filePath) => {
    if (isReloading) return;
    
    if (filePath.includes('hot-reload.js')) return;
    
    console.log(`🔄 File ${path.basename(filePath)} has been changed. Reloading...`);

    isReloading = true;

    try {
      delete require.cache[require.resolve(filePath)];

      const fileExt = path.extname(filePath);
    
    if (fileExt === '.js') {
      console.log(`🔄 ${path.basename(filePath)} changed, reloading...`);
      
      try {
        delete require.cache[require.resolve(filePath)];
        
        if (filePath.includes('main.js')) {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('main-process-reloading');
            mainWindow.close();
          }
          app.relaunch();
          app.exit(0);
        } else {
          const module = await import(filePath);
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