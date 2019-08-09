const diseasesUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/disease-summary-table.txt';
const genesUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/gene-summary-table.txt';
const featuresUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/feature-summary-table.txt';
const diseaseInfoUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/disease-info/';
const geneInfoUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/gene-info/';
const diseasePredictionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/disease-tables/';
const genePredictionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/gene-tables/';
const featurePredictionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/feature-tables/';
const contributionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/prediction-terms/';

export async function fetchMainData() {
  const diseases = await (await fetch(diseasesUrl)).text();
  const genes = await (await fetch(genesUrl)).text();
  const features = await (await fetch(featuresUrl)).text();

  return {
    diseases: assembleData(diseases),
    genes: assembleData(genes),
    features: assembleData(features)
  };
}

export async function fetchDiseasePredictions(diseaseId) {
  const diseasePredictions = await (await fetch(
    diseasePredictionsUrl + diseaseId.replace(':', '_') + '.txt'
  )).text();

  return { diseasePredictions: assembleData(diseasePredictions) };
}

export async function fetchGenePredictions(geneId) {
  const genePredictions = await (await fetch(
    genePredictionsUrl + geneId.replace(':', '_') + '.txt'
  )).text();

  return { genePredictions: assembleData(genePredictions) };
}

export async function fetchFeaturePredictions(featureId) {
  const featurePredictions = await (await fetch(
    featurePredictionsUrl + featureId.replace(':', '_') + '.txt'
  )).text();

  return { featurePredictions: assembleData(featurePredictions) };
}

export async function fetchDiseaseInfo(diseaseId) {
  const diseaseInfo = await (await fetch(
    diseaseInfoUrl + diseaseId.replace(':', '_') + '.json'
  )).json();

  return { diseaseInfo: diseaseInfo };
}

export async function fetchGeneInfo(geneId) {
  const geneInfo = await (await fetch(
    geneInfoUrl + geneId.replace(':', '_') + '.json'
  )).json();

  return { geneInfo: geneInfo };
}

export async function fetchContributions(
  diseasePredictionId,
  genePredictionId
) {
  let contributions = await (await fetch(
    contributionsUrl +
      diseasePredictionId.replace(':', '_') +
      '/' +
      genePredictionId.replace(':', '_') +
      '.txt'
  )).text();

  // put data in format expected by Google Charts
  contributions = contributions
    .trim()
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row)
    .map((row) =>
      row
        .split('\t')
        .map((cell) => cell.trim())
        .map((cell) => (Number.isNaN(Number(cell)) ? cell : Number(cell)))
        .filter((cell) => cell !== '')
    );

  // put highest contributions at top of chart
  contributions.sort((a, b) => {
    if (typeof b[1] !== 'number')
      return 1;
    else if (typeof a[1] !== 'number')
      return -1;
    else
      return b[1] - a[1];
  });

  return { contributions: contributions };
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
        .map((cell) => (Number.isNaN(Number(cell)) ? cell : Number(cell)))
        .filter((cell) => cell !== '')
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
