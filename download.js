const Downloader = require("./Modules/download.js");
const Convert = require("./Modules/convert.js");
const Remove = require("./Modules/remove.js");

const download = "https://www.youtube.com/watch?v=VxiUP8LSbG0";
const directoryPath = 'downloads/audio';

async function run() {
    await Downloader.download(download);
    console.log("Download complete!");
    await Convert.convertAllWebMToMP3(directoryPath);
    console.log("Conversion complete!");
    await Remove.removeWebMFiles(directoryPath);
    console.log("All done!");
}

run();