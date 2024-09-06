const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('start-renaming', (event, selectedFolderPath) => {
    renameVideosInDirectory(selectedFolderPath);
});

function getFileCreationDate(filePath) {
    const stats = fs.statSync(filePath);
    return stats.mtime;
}

function renameVideosInDirectory(filePath) {
    try {
        const fileExtension = path.extname(filePath).toLowerCase();
        if (['.mp4', '.mov', '.avi'].includes(fileExtension)) {
            const creationDate = getFileCreationDate(filePath);
            const file = path.basename(filePath);
            const formattedDate = creationDate.toISOString().substring(0, 10);
            const newFileName = `${formattedDate}_${file}`;
            const directoryPath = path.dirname(filePath);
            const newFilePath = path.join(directoryPath, newFileName);
            fs.renameSync(filePath, newFilePath);
            console.log(`Renamed "${file}" to "${newFileName}"`);
        }
        console.log('Renaming complete.');
    } catch (err) {
        console.error('Error:', err);
        window.alert(`Error while renaming ${filePath}: ${err}`);
    }
}
