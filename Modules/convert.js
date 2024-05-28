const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Function to convert WebM to MP3
function convertToMP3(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        // ffmpeg -i test.webm  -vn -ab 128k -ar 44100 -y "test.mp3";
        const command = `ffmpeg -i "${inputFile}" -map a -vn -ab 96k -ar 44100 -y "${outputFile}"`;
        console.log('Conversion command:', command);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error converting ${inputFile}:`, stderr);
                reject(error);
            } else {
                console.log(`Conversion of ${inputFile} finished`);
                resolve();
            }
        });
    });
}

// Function to get list of all .webm files in a directory
function getFilesInDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const webmFiles = files.filter(file => path.extname(file).toLowerCase() === '.webm' || path.extname(file).toLowerCase() === '.mp4');
                resolve(webmFiles);
            }
        });
    });
}

// Main function to convert all .webm files in a directory
async function convertAllToMP3(directoryPath) {
    try {
        const webmFiles = await getFilesInDirectory(directoryPath);
        const conversionPromises = webmFiles.map(async file => {
            const inputFilePath = path.join(directoryPath, file);
            var outputFilePath
            if (path.extname(file).toLowerCase() === '.webm') {
                outputFilePath = path.join(directoryPath, path.basename(file, '.webm') + '.mp3');
            }
            if (path.extname(file).toLowerCase() === '.mp4') {
                outputFilePath = path.join(directoryPath, path.basename(file, '.mp4') + '.mp3');
            }
            try {
                await convertToMP3(inputFilePath, outputFilePath);
                console.log(`Conversion of ${inputFilePath} finished`);
            } catch (error) {
                console.error(`Conversion of ${inputFilePath} failed:`, error);
            }
        });
        await Promise.all(conversionPromises);
        console.log('All conversions finished');
    } catch (error) {
        console.error('Conversion failed:', error);
    }
}

module.exports = { convertAllToMP3 };