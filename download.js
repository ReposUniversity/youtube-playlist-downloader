const Downloader = require("./Modules/download.js");
const Convert = require("./Modules/convert.js");
const Remove = require("./Modules/remove.js");

const download = "https://www.youtube.com/watch?v=ot2hqe_iYkQ";
const directoryPath = 'downloads/audio';

async function run() {
    await Downloader.download(download);
    console.log("Download complete!");
    await Convert.convertAllToMP3(directoryPath);
    console.log("Conversion complete!");
    await Remove.removeNotMp3Files(directoryPath);
    console.log("All done!");
}

run();