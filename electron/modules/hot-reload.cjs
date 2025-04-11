const { app } = require('electron');
const chokidar = require('chokidar');
const path = require('path');

let mainWindow = null;
let isReloading = false;

/**
 * Configure hot reload for the main process
 * @param {BrowserWindow} browserWindow - The main browser window
 */
function configureHotReload(browserWindow) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    return;
  }

  mainWindow = browserWindow;
  console.log('🔥 Hot reload enabled.');
  
  const electronDir = path.join(__dirname);
  
  const watcher = chokidar.watch(electronDir, {
    ignored: /node_modules|[/\\]\./,
    persistent: true
  });

  watcher.on('change', (filePath) => {
    if (isReloading) return;
    
    if (filePath.includes('hot-reload.cjs')) return;
    
    console.log(`🔄 File ${path.basename(filePath)} has been changed. Reloading...`);

    isReloading = true;

    delete require.cache[require.resolve(filePath)];

    if (filePath.includes('main.cjs')) {
      console.log('🔄 Main process file changed, restarting app...');

      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('main-process-reloading');
      }
      
      app.relaunch();
      app.exit(0);
    } 
    else if (filePath.includes('menu.cjs')) {
      console.log('🔄 Menu file changed, reloading menu...');
      try {
        delete require.cache[require.resolve('./menu.cjs')];

        const { setApplicationMenu } = require('../menu.cjs');
        setApplicationMenu();

        isReloading = false;
      } catch (error) {
        console.error('Error reloading menu:', error);
        isReloading = false;
      }
    } 
    else if (filePath.includes('preload.cjs')) {
      console.log('🔄 Preload file changed, reloading window...');
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.reload();
      }
      isReloading = false;
    }
    else {
      isReloading = false;
    }
  });
}

module.exports = { configureHotReload };