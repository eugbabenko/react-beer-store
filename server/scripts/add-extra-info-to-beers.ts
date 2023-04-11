import * as fs from 'fs';
import * as luxon from 'luxon';
import * as camelcaseKeys from 'camelcase-object-deep';

const fsPromises = fs.promises;

const stripNumber = (numberToStrip: number): number => {
  return parseFloat(parseFloat(String(numberToStrip)).toFixed(2));
};

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

async function addExtraInfoToBeers() {
  console.log(`Add Extra Info To Beers...`);
  console.time(`Add Extra Info To Beers success`);
  const rawDataBeers = await fsPromises.readFile('./data/beers.json', 'utf8');
  const beers = JSON.parse(rawDataBeers);

  const camelcasedBeers = camelcaseKeys(beers, { deep: true });

  const beersWithPrices = camelcasedBeers.map((beer) => {
    const isKEG = !beer.imageUrl ? true : beer.imageUrl.includes('keg');

    const pricePerBottleOrLiter = getRandomArbitrary(0.5, 1);

    const randomCreatedAt = luxon.DateTime.fromJSDate(
      randomDate(new Date(2022, 0, 1), new Date()),
    ).toISO();

    return {
      ...beer,
      imageUrl: beer.imageUrl ? `/public/images/beers/${beer.id}.png` : null,
      currency: 'USD',
      containerType: isKEG ? 'KEG' : 'BOTTLE',
      volume: {
        ...beer.volume,
        value: isKEG ? 20 : 0.5,
      },
      price: isKEG
        ? stripNumber(pricePerBottleOrLiter * 20)
        : stripNumber(pricePerBottleOrLiter),
      amount:
        Math.round(getRandomArbitrary(0, 2)) === 0
          ? 0
          : Math.round(getRandomArbitrary(1, 140)),
      brewedAt: luxon.DateTime.fromJSDate(
        randomDate(new Date(2022, 0, 1), new Date()),
      ).toISO(),
      createdAt: randomCreatedAt,
      updatedAt: randomCreatedAt,
    };
  });

  await fsPromises.writeFile(
    './data/final-beers.json',
    JSON.stringify(beersWithPrices, undefined, 2),
  );

  console.timeEnd('Add Extra Info To Beers success');
}

addExtraInfoToBeers().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
