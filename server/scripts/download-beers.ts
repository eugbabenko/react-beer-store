import * as fs from 'fs';
import axios from 'axios';

const fsPromises = fs.promises;

async function downloadBeers() {
  console.log(`Fetching beers...`);
  console.time(`Fetching beers success`);

  let allBeers = [];
  let lengthOfBeersOfLastCall = 0;
  let page = 1;

  do {
    console.log(`getting beers from page ${page}.`);

    const { data: beers } = await axios.get(
      `https://api.punkapi.com/v2/beers?page=${page}&per_page=80`,
      { headers: { 'Accept-Encoding': 'application/json' } },
    );
    allBeers = [...allBeers, ...beers];
    page++;
    lengthOfBeersOfLastCall = beers.length;

    //Delay 2 secs because of api limits
    await new Promise((r) => setTimeout(r, 3000));
  } while (lengthOfBeersOfLastCall !== 0);

  await fsPromises.writeFile(
    './data/beers.json',
    JSON.stringify(allBeers, undefined, 2),
  );

  console.timeEnd('Fetching beers success');
}

downloadBeers().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
