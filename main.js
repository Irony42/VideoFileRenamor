const fs = require('fs');
const path = require('path');

function getFileCreationDate(filePath) {
    const stats = fs.statSync(filePath);
    console.log('stats :', stats);
    return stats.mtime;
}

function renameVideosInDirectory(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileExtension = path.extname(filePath).toLowerCase();
            if (fileExtension === '.mp4' || fileExtension === '.mov' || fileExtension === '.avi') {
                const creationDate = getFileCreationDate(filePath);
                const formattedDate = creationDate.toISOString().substring(0, 10);
                const newFileName = `${formattedDate}_${file}`;
                const newFilePath = path.join(directoryPath, newFileName);
                fs.renameSync(filePath, newFilePath);
                console.log(`Renamed "${file}" to "${newFileName}"`);
            }
        }
        console.log('Renaming complete.');
    } catch (err) {
        console.error('Error:', err);
    }
}

renameVideosInDirectory('C:\\src\\Blaireau');
