const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Function to convert WebM to MP3
function convertWebMtoMP3(inputFile, outputFile) {
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
function getWebMFilesInDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const webmFiles = files.filter(file => path.extname(file).toLowerCase() === '.webm');
                resolve(webmFiles);
            }
        });
    });
}

// Main function to convert all .webm files in a directory
async function convertAllWebMToMP3(directoryPath) {
    try {
        const webmFiles = await getWebMFilesInDirectory(directoryPath);
        const conversionPromises = webmFiles.map(async file => {
            const inputFilePath = path.join(directoryPath, file);
            const outputFilePath = path.join(directoryPath, path.basename(file, '.webm') + '.mp3');
            try {
                await convertWebMtoMP3(inputFilePath, outputFilePath);
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

module.exports = { convertAllWebMToMP3 };