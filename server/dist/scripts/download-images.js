"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const axios_1 = require("axios");
const fsPromises = fs.promises;
const downloadAndSaveImage = async (url, filepath) => {
    const response = await (0, axios_1.default)({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
};
async function downloadImages() {
    console.log(`Fetching images...`);
    console.time(`Fetching images success`);
    const rawDataBeers = await fsPromises.readFile('./data/beers.json', 'utf8');
    const beers = JSON.parse(rawDataBeers);
    for (let i = 0; i < beers.length; i++) {
        if (beers[i].image_url) {
            const splitImageUrl = beers[i].image_url.split('.');
            const imageResolution = splitImageUrl[splitImageUrl.length - 1];
            const savedImageName = `${beers[i].id}.${imageResolution}`;
            await downloadAndSaveImage(beers[i].image_url, `./data/images/${savedImageName}`);
            beers[i].image_url = savedImageName;
            console.log(`Image ${savedImageName} downloaded`);
            await new Promise((r) => setTimeout(r, 100));
        }
    }
    await fsPromises.writeFile('./data/beers-with-new-images.json', JSON.stringify(beers, undefined, 2));
    console.timeEnd('Fetching images success');
}
downloadImages().catch(async (e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=download-images.js.map