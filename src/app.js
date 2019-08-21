import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { fetchMainData } from './data.js';
import { fetchDiseaseInfo } from './data.js';
import { fetchDiseasePredictions } from './data.js';
import { fetchGeneInfo } from './data.js';
import { fetchGenePredictions } from './data.js';
import { fetchFeatureInfo } from './data.js';
import { fetchFeaturePredictions } from './data.js';
import { fetchContributions } from './data.js';
import { Diseases } from './diseases.js';
import { DiseaseInfo } from './disease-info.js';
import { DiseasePredictions } from './disease-predictions.js';
import { DiseasePredictionInfo } from './disease-prediction-info.js';
import { DiseaseContributions } from './disease-contributions.js';
import { Genes } from './genes.js';
import { GeneInfo } from './gene-info.js';
import { GenePredictions } from './gene-predictions.js';
import { GenePredictionInfo } from './gene-prediction-info.js';
import { GeneContributions } from './gene-contributions.js';
import { Features } from './features.js';
import { FeatureInfo } from './feature-info.js';
import { FeaturePredictions } from './feature-predictions.js';
import { FeaturePredictionInfo } from './feature-prediction-info.js';

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
  }

  // when component mounds
  componentDidMount() {
    // listen for back/forward navigation (history)
    window.addEventListener('popstate', this.loadStateFromUrl);
  }

  // when component unmounts
  componentWillUnmount() {
    window.removeEventListener('popstate', this.loadStateFromUrl);
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
    setFeature(feature).then((results) =>
      this.setState(results, this.updateUrl)
    );
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

  // set selected feature prediction
  setFeaturePrediction = (featurePrediction) => {
    setFeaturePrediction(featurePrediction).then((results) =>
      this.setState(results, this.updateUrl)
    );
  };

  // update url based on state
  updateUrl = () => {
    const params = new URLSearchParams();

    params.set('tab', this.state.tab);

    if (this.state.tab === 'diseases' && this.state.disease)
      params.set('id', this.state.disease.disease_code.replace(':', '_'));
    if (this.state.tab === 'genes' && this.state.gene)
      params.set('id', this.state.gene.gene_code.replace(':', '_'));
    if (this.state.tab === 'features' && this.state.feature)
      params.set('id', this.state.feature.feature);
    if (this.state.tab === 'diseases' && this.state.diseasePrediction) {
      params.set(
        'pred',
        this.state.diseasePrediction.gene_code.replace(':', '_')
      );
    }
    if (this.state.tab === 'genes' && this.state.genePrediction) {
      params.set(
        'pred',
        this.state.genePrediction.disease_code.replace(':', '_')
      );
    }
    if (this.state.tab === 'features' && this.state.featurePrediction) {
      params.set(
        'pred',
        this.state.featurePrediction.disease_code.replace(':', '_')
      );
    }

    const url =
      window.location.origin +
      window.location.pathname +
      '?' +
      params.toString();

    window.history.pushState({}, '', url);
    if (params.get('id'))
      document.title = params.get('id');
  };

  // load state from url
  loadStateFromUrl = () => {
    loadStateFromUrl(this.state).then((results) => this.setState(results));
  };

  // display component
  render() {
    return (
      <>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'diseases'}
          onClick={() => this.setTab('diseases')}
          tooltipText='Select a disease and show predictions for all genes'
        >
          Diseases
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'genes'}
          onClick={() => this.setTab('genes')}
          tooltipText='Select a gene and show predictions for all diseases'
        >
          Genes
        </Button>
        <Button
          className='tab_button'
          disabled={this.state.tab !== 'features'}
          onClick={() => this.setTab('features')}
          tooltipText='Browse features that measure how common different types
          of paths (metapaths) that connect genes to disease are and their
          ability to predict associations'
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
        <GenePredictions
          visible={this.state.tab === 'genes'}
          gene={this.state.gene}
          genePredictions={this.state.genePredictions}
          setGenePrediction={this.setGenePrediction}
          genePrediction={this.state.genePrediction}
        />
        <GenePredictionInfo
          visible={this.state.tab === 'genes'}
          gene={this.state.gene}
          genePrediction={this.state.genePrediction}
          genePredictionInfo={this.state.genePredictionInfo}
        />
        <GeneContributions
          visible={this.state.tab === 'genes'}
          gene={this.state.gene}
          genePrediction={this.state.genePrediction}
          contributions={this.state.contributions}
        />
        <Features
          visible={this.state.tab === 'features'}
          features={this.state.features}
          setFeature={this.setFeature}
          feature={this.state.feature}
        />
        <FeatureInfo
          visible={this.state.tab === 'features'}
          feature={this.state.feature}
          featureInfo={this.state.featureInfo}
        />
        <FeaturePredictions
          visible={this.state.tab === 'features'}
          feature={this.state.feature}
          featurePredictions={this.state.featurePredictions}
          setFeaturePrediction={this.setFeaturePrediction}
          featurePrediction={this.state.featurePrediction}
        />
        <FeaturePredictionInfo
          visible={this.state.tab === 'features'}
          feature={this.state.feature}
          featurePrediction={this.state.featurePrediction}
          featurePredictionInfo={this.state.featurePredictionInfo}
        />
      </>
    );
  }
}

// set selected disease
async function setDisease(disease) {
  if (!disease)
    return {};

  const diseaseInfo = await fetchDiseaseInfo(disease.disease_code);
  const diseasePredictions = await fetchDiseasePredictions(
    disease.disease_code
  );
  return { disease: disease, ...diseaseInfo, ...diseasePredictions };
}

// set selected gene
async function setGene(gene) {
  if (!gene)
    return {};

  const geneInfo = await fetchGeneInfo(gene.gene_code);
  const genePredictions = await fetchGenePredictions(gene.gene_code);
  return { gene: gene, ...geneInfo, ...genePredictions };
}

// set selected feature
async function setFeature(feature) {
  if (!feature)
    return {};

  const featureInfo = await fetchFeatureInfo(feature.feature);
  const featurePredictions = await fetchFeaturePredictions(feature.feature);
  return { feature: feature, ...featureInfo, ...featurePredictions };
}

// set selected disease prediction
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

// set selected gene prediction
async function setGenePrediction(gene, genePrediction) {
  if (!gene || !genePrediction)
    return {};

  const genePredictionInfo =
    ((await fetchDiseaseInfo(genePrediction.disease_code)) || {}).diseaseInfo ||
    {};
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

// set selected feature prediction
async function setFeaturePrediction(featurePrediction) {
  if (!featurePrediction)
    return {};

  const featurePredictionInfo =
    ((await fetchDiseaseInfo(featurePrediction.disease_code)) || {})
      .diseaseInfo || {};
  return {
    featurePrediction: featurePrediction,
    featurePredictionInfo: featurePredictionInfo
  };
}

// load state from url
async function loadStateFromUrl(state) {
  // get parameters from url
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  let id = params.get('id') || '';
  const pred = (params.get('pred') || '').replace('_', ':');

  if (tab === 'diseases' || tab === 'genes')
    id = id.replace('_', ':');

  let newState = {};

  // set tab
  if (tab)
    newState.tab = tab;

  // if diseases tab
  if (tab === 'diseases') {
    // set disease and disease prediction
    if (id) {
      newState.disease = state.diseases.find(
        (disease) => disease.disease_code === id
      );
      newState = { ...newState, ...(await setDisease(newState.disease)) };
      if (pred) {
        newState.diseasePrediction = newState.diseasePredictions.find(
          (diseasePrediction) => diseasePrediction.gene_code === pred
        );
        newState = {
          ...newState,
          ...(await setDiseasePrediction(
            newState.disease,
            newState.diseasePrediction
          ))
        };
      }
    }
  }

  // if genes tab
  if (tab === 'genes') {
    // set gene and gene prediction
    if (id) {
      newState.gene = state.genes.find((gene) => gene.gene_code === id);
      newState = { ...newState, ...(await setGene(newState.gene)) };
      if (pred) {
        newState.genePrediction = newState.genePredictions.find(
          (genePrediction) => genePrediction.disease_code === pred
        );
        newState = {
          ...newState,
          ...(await setGenePrediction(newState.gene, newState.genePrediction))
        };
      }
    }
  }

  // if features tab
  if (tab === 'features') {
    // set feature and feature prediction
    if (id) {
      newState.feature = state.features.find(
        (feature) => feature.feature === id
      );
      newState = { ...newState, ...(await setFeature(newState.feature)) };
      if (pred) {
        newState.featurePrediction = newState.featurePredictions.find(
          (featurePrediction) => featurePrediction.disease_code === pred
        );
        newState = {
          ...newState,
          ...(await setFeaturePrediction(newState.featurePrediction))
        };
      }
    }
  }

  return newState;
}
