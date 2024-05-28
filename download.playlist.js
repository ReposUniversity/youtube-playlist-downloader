const Downloader = require("./Modules/download.js");
const Convert = require("./Modules/convert.js");
const Remove = require("./Modules/remove.js");

const playlist = "https://www.youtube.com/playlist?list=PLrhzvIcii6GNjpARdnO4ueTUAVR9eMBpc";
const directoryPath = 'downloads/audio';

async function run() {
    await Downloader.downloadPlaylist(playlist);
    await Convert.convertAllToMP3(directoryPath);
    await Remove.removeNotMp3Files(directoryPath);
    console.log("All done!");
}

run();