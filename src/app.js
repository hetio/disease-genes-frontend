import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { fetchMainData } from './data.js';
import { fetchDiseaseInfo } from './data.js';
import { fetchDiseasePredictions } from './data.js';
import { fetchGeneInfo } from './data.js';
import { fetchGenePredictions } from './data.js';
import { fetchContributions } from './data.js';
import { Diseases } from './diseases.js';
import { DiseaseInfo } from './disease-info.js';
import { DiseasePredictions } from './disease-predictions.js';
import { DiseasePredictionInfo } from './disease-prediction-info.js';
import { DiseaseContributions } from './disease-contributions.js';
import { Genes } from './genes.js';
import { GeneInfo } from './gene-info.js';

import './app.css';

// main app component
export class App extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.tab = 'diseases';
    this.state.diseases = [];
    this.state.genes = [];
    this.state.features = [];
    this.state.disease = null;
    this.state.gene = null;
    this.state.diseaseInfo = {};
    this.state.geneInfo = {};
    this.state.featureInfo = {};
    this.state.diseasePredictions = [];
    this.state.genePredictions = [];
    this.state.featurePredictions = [];
    this.state.feature = null;
    this.state.diseasePrediction = null;
    this.state.genePrediction = null;
    this.state.diseasePredictionInfo = {};
    this.state.genePredictionInfo = {};
    this.state.diseaseContributions = [];
    this.state.geneContributions = [];

    fetchMainData().then((results) =>
      this.setState(results, this.loadStateFromUrl)
    );
    // listen for back/forward navigation (history)
    window.addEventListener('popstate', this.loadStateFromUrl);
  }

  // set active tab
  setTab = (tab) => {
    this.setState({ tab: tab }, this.updateUrl);
  };

  // set selected disease
  setDisease = (disease) => {
    setDisease(disease).then((results) =>
      this.setState(results, this.updateUrl)
    );
  };

  // set selected gene
  setGene = (gene) => {
    setGene(gene).then((results) => this.setState(results, this.updateUrl));
  };

  // set selected feature
  setFeature = (feature) => {
    this.setState({ feature: feature }, this.updateUrl);
  };

  // set selected disease prediction
  setDiseasePrediction = (diseasePrediction) => {
    setDiseasePrediction(this.state.disease, diseasePrediction).then(
      (results) => this.setState(results, this.updateUrl)
    );
  };

  // set selected gene prediction
  setGenePrediction = (genePrediction) => {
    setGenePrediction(this.state.gene, genePrediction).then((results) =>
      this.setState(results, this.updateUrl)
    );
  };

  // update url based on state
  updateUrl = () => {
    // const params = new URLSearchParams();
    // params.set('tab', this.state.tab);
    // if (this.state.tab === 'diseases' && this.state.disease)
    //   params.set('id', this.state.disease.disease_code);
    // if (this.state.tab === 'genes' && this.state.gene)
    //   params.set('id', this.state.gene.gene_code);
    // if (this.state.tab === 'features' && this.state.feature)
    //   params.set('id', this.state.feature.feature);
    // if (this.state.tab === 'diseases' && this.state.diseasePrediction)
    //   params.set('pred', this.state.diseasePrediction.gene_code);
    // if (this.state.tab === 'genes' && this.state.genePrediction)
    //   params.set('pred', this.state.genePrediction.disease_code);
    // const url =
    //   window.location.origin +
    //   window.location.pathname +
    //   '?' +
    //   params
    //     .toString()
    //     .split(':')
    //     .join('_');
    // window.history.pushState({}, '', url);
    // if (params.get('id'))
    //   document.title = params.get('id');
  };

  // load state from url
  loadStateFromUrl = () => {
    // const params = new URLSearchParams(window.location.search);
    // const tab = params.get('tab');
    // const id = (params.get('id') || '').replace('_', ':');
    // const pred = (params.get('pred') || '').replace('_', ':');
    // const query = {};
    // if (tab === 'diseases') {
    //   query.diseaseId = id;
    //   query.diseasePredictionId = pred;
    // }
    // this.setState(newState);
  };

  // display component
  render() {
    return (
      <>
        {console.log(this.state)}
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'diseases'}
          onClick={() => this.setTab('diseases')}
        >
          Diseases
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'genes'}
          onClick={() => this.setTab('genes')}
        >
          Genes
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'features'}
          onClick={() => this.setTab('features')}
        >
          Features
        </Button>
        <Diseases
          visible={this.state.tab === 'diseases'}
          diseases={this.state.diseases}
          setDisease={this.setDisease}
          disease={this.state.disease}
        />
        <DiseaseInfo
          visible={this.state.tab === 'diseases'}
          disease={this.state.disease}
          diseaseInfo={this.state.diseaseInfo}
        />
        <DiseasePredictions
          visible={this.state.tab === 'diseases'}
          disease={this.state.disease}
          diseasePredictions={this.state.diseasePredictions}
          setDiseasePrediction={this.setDiseasePrediction}
          diseasePrediction={this.state.diseasePrediction}
        />
        <DiseasePredictionInfo
          visible={this.state.tab === 'diseases'}
          disease={this.state.disease}
          diseasePrediction={this.state.diseasePrediction}
          diseasePredictionInfo={this.state.diseasePredictionInfo}
        />
        <DiseaseContributions
          visible={this.state.tab === 'diseases'}
          disease={this.state.disease}
          diseasePrediction={this.state.diseasePrediction}
          contributions={this.state.contributions}
        />
        <Genes
          visible={this.state.tab === 'genes'}
          genes={this.state.genes}
          setGene={this.setGene}
          gene={this.state.gene}
        />
        <GeneInfo
          visible={this.state.tab === 'genes'}
          gene={this.state.gene}
          geneInfo={this.state.geneInfo}
        />
        {/*
        <GenePredictions gene={this.state.gene} />
        <Features
          features={this.state.features}
          setFeature={this.setFeature}
          feature={this.state.feature}
        />
        <FeatureInfo feature={this.state.feature} /> */}
      </>
    );
  }
}

async function setDisease(disease) {
  if (!disease)
    return {};

  const diseaseInfo = await fetchDiseaseInfo(disease.disease_code);
  const diseasePredictions = await fetchDiseasePredictions(
    disease.disease_code
  );
  return { disease: disease, ...diseaseInfo, ...diseasePredictions };
}

async function setDiseasePrediction(disease, diseasePrediction) {
  if (!disease || !diseasePrediction)
    return {};

  const diseasePredictionInfo =
    ((await fetchGeneInfo(diseasePrediction.gene_code)) || {}).geneInfo || {};
  const contributions = await fetchContributions(
    disease.disease_code,
    diseasePrediction.gene_code
  );
  return {
    diseasePrediction: diseasePrediction,
    diseasePredictionInfo: diseasePredictionInfo,
    ...contributions
  };
}

async function setGene(gene) {
  if (!gene)
    return {};

  const geneInfo = await fetchGeneInfo(gene.gene_code);
  const genePredictions = await fetchGenePredictions(gene.gene_code);
  return { gene: gene, ...geneInfo, ...genePredictions };
}

async function setGenePrediction(gene, genePrediction) {
  if (!gene || !genePrediction)
    return {};

  const genePredictionInfo =
    ((await fetchGeneInfo(genePrediction.disease_code)) || {}).diseasenfo || {};
  const contributions = await fetchContributions(
    genePrediction.disease_code,
    gene.gene_code
  );
  return {
    genePrediction: genePrediction,
    genePredictionInfo: genePredictionInfo,
    ...contributions
  };
}
