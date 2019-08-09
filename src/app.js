import React from 'react';
import { Component } from 'react';

import { Button } from 'hetio-frontend-components';
import { fetchData } from './data.js';
import { Diseases } from './diseases.js';
import { DiseasePredictions } from './disease-predictions.js';
import { DiseaseInfo } from './disease-info.js';
import { Genes } from './genes.js';
import { GeneInfo } from './gene-info.js';
import { GenePredictions } from './gene-predictions.js';
import { Features } from './features.js';
import { FeatureInfo } from './feature-info.js';
import { FeaturePredictions } from './feature-predictions.js';

import './app.css';

// main app component
export class App extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    this.state.tab = 'diseases';
    this.state.disease = null;
    this.state.gene = null;
    this.state.feature = null;
    this.state.diseases = [];
    this.state.genes = [];
    this.state.features = [];

    // listen for back/forward navigation (history)
    window.addEventListener('popstate', this.loadStateFromUrl);

    fetchData().then((results) => {
      this.setState(
        {
          diseases: results.diseases,
          genes: results.genes,
          features: results.features
        },
        this.loadStateFromUrl
      );
    });
  }

  // set active tab
  setTab = (tab) => {
    this.setState({ tab: tab }, this.updateUrl);
  };

  // set selected disease
  setDisease = (disease) => {
    this.setState({ disease: disease }, this.updateUrl);
  };

  // set selected gene
  setGene = (gene) => {
    this.setState({ gene: gene }, this.updateUrl);
  };

  // set selected feature
  setFeature = (feature) => {
    this.setState({ feature: feature }, this.updateUrl);
  };

  // update url based on state
  updateUrl = () => {
    const params = new URLSearchParams();
    params.set('tab', this.state.tab);
    if (this.state.tab === 'diseases' && this.state.disease)
      params.set('id', this.state.disease.disease_code.replace(':', '_'));
    if (this.state.tab === 'genes' && this.state.gene)
      params.set('id', this.state.gene.gene_code);
    if (this.state.tab === 'features' && this.state.feature)
      params.set('id', this.state.feature.feature);

    const url =
      window.location.origin +
      window.location.pathname +
      '?' +
      params.toString();
    window.history.pushState({}, '', url);

    if (params.get('id')) document.title = params.get('id');
  };

  // load state from url
  loadStateFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const newState = {};
    if (params.get('tab')) newState.tab = params.get('tab');
    let id = params.get('id');
    if (newState.tab === 'diseases') {
      if (id) id = id.replace('_', ':');
      newState.disease = this.state.diseases.find(
        (disease) => disease.disease_code === id
      );
    }
    if (newState.tab === 'genes') {
      newState.gene = this.state.genes.find((gene) => gene.gene_code === id);
    }
    if (newState.tab === 'features') {
      newState.feature = this.state.features.find(
        (feature) => feature.feature === id
      );
    }

    this.setState(newState);
  };

  // display component
  render() {
    return (
      <>
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
        <div
          style={{ display: this.state.tab === 'diseases' ? 'block' : 'none' }}
        >
          <Diseases
            diseases={this.state.diseases}
            setDisease={this.setDisease}
            disease={this.state.disease}
          />
          <div style={{ display: this.state.disease ? 'block' : 'none' }}>
            <DiseaseInfo disease={this.state.disease} />
            <DiseasePredictions disease={this.state.disease} />
          </div>
        </div>
        <div style={{ display: this.state.tab === 'genes' ? 'block' : 'none' }}>
          <Genes
            genes={this.state.genes}
            setGene={this.setGene}
            gene={this.state.gene}
          />
          <div style={{ display: this.state.gene ? 'block' : 'none' }}>
            <GeneInfo gene={this.state.gene} />
            <GenePredictions gene={this.state.gene} />
          </div>
        </div>
        <div
          style={{ display: this.state.tab === 'features' ? 'block' : 'none' }}
        >
          <Features
            features={this.state.features}
            setFeature={this.setFeature}
            feature={this.state.feature}
          />
          <div style={{ display: this.state.feature ? 'block' : 'none' }}>
            <FeatureInfo feature={this.state.feature} />
            <FeaturePredictions feature={this.state.feature} />
          </div>
        </div>
      </>
    );
  }
}
