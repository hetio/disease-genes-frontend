import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class DiseasePredictionInfo extends Component {
  // display component
  render() {
    if (!this.props.disease || !this.props.diseasePrediction)
      return <></>;

    const diseasePrediction = this.props.diseasePrediction;
    const name = diseasePrediction.gene_symbol;
    const info = this.props.diseasePredictionInfo || {};
    const bodyContents = [
      [
        'aliases',
        tooltipText['gene_aliases'],
        info.aliases && info.aliases.length ? info.aliases.join(', ') : ''
      ],
      ['HGNC id', tooltipText['gene_id'], diseasePrediction.gene_code],
      ['Entrez id', tooltipText['gene_entrez_id'], info.entrez],
      ['Ensembl id', tooltipText['gene_ensembl_id'], info.ensembl],
      ['Uniprot id', tooltipText['gene_uniprot_id'], info.uniprot],
      ['status', tooltipText['gene_status'], diseasePrediction.status],
      [
        'other assoc',
        tooltipText['gene_other_associations'],
        diseasePrediction.other_associations
      ],
      [
        'mean prediction',
        tooltipText['gene_mean_prediction'],
        toFixed(diseasePrediction.mean_prediction) + '%',
        toFixed(diseasePrediction.mean_prediction / 100, 4)
      ],
      [
        'prediction',
        tooltipText['gene_prediction'],
        toFixed(diseasePrediction.prediction) + '%',
        toFixed(diseasePrediction.prediction / 100, 4)
      ]
    ];

    return (
      <div
        className='app_section'
        style={{ display: this.props.visible ? 'block' : 'none' }}
      >
        <hr />
        <p className='left'>
          Info about{' '}
          <b>
            <i>{name}</i>
          </b>
        </p>
        <InfoTable bodyContents={bodyContents} />
      </div>
    );
  }
}
