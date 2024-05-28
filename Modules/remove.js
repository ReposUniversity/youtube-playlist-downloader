const fs = require('fs');
const path = require('path');

// Function to remove all .webm and .mp4 files from a directory
function removeNotMp3Files(directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                reject(err);
                return;
            }

            const deletionPromises = [];
            files.forEach((file) => {
                if (file.endsWith('.webm') || file.endsWith('.mp4')) {
                    const filePath = path.join(directory, file);
                    deletionPromises.push(new Promise((resolveFile, rejectFile) => {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                                rejectFile(err);
                            } else {
                                console.log('File deleted:', filePath);
                                resolveFile();
                            }
                        });
                    }));
                }
            });

            Promise.all(deletionPromises)
                .then(() => {
                    console.log('All .webm files deleted from directory:', directory);
                    resolve();
                })
                .catch((error) => {
                    console.error('Error deleting .webm files:', error);
                    reject(error);
                });
        });
    });
}

module.exports = { removeNotMp3Files };
