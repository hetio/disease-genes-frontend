const diseasesUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/disease-summary-table.txt';
const genesUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/gene-summary-table.txt';

// get data from above urls
export async function fetchData() {
  const diseases = await (await fetch(diseasesUrl)).text();
  const genes = await (await fetch(genesUrl)).text();

  return {
    diseases: assembleData(diseases),
    genes: assembleData(genes)
  };
}

// turn tsv data into expected format
export function assembleData(results) {
  const newData = [];
  results = results
    .trim()
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row)
    .map((row) =>
      row
        .split('\t')
        .map((cell) => cell.trim())
        .filter((cell) => cell)
    );

  for (const datum of results) {
    const newDatum = {};
    for (
      let index = 0;
      index < results[0].length && index < datum.length;
      index++
    )
      newDatum[results[0][index]] = datum[index];

    newData.push(newDatum);
  }
  newData.shift();

  return newData;
}
