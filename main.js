const Downloader = require("./Modules/download.js");
const Convert = require("./Modules/convert.js");
const Remove = require("./Modules/remove.js");

const playlist = "https://www.youtube.com/playlist?list=PLmmYSbUCWJ4x1GO839azG_BBw8rkh-zOj";
const directoryPath = 'downloads/audio';

async function run() {
    await Downloader.downloadPlaylist(playlist);
    await Convert.convertAllWebMToMP3(directoryPath);
    await Remove.removeFiles(directoryPath);
    console.log("All done!");
}

run();