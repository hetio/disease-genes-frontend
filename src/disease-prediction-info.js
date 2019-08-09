import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

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
        '',
        info.aliases && info.aliases.length ? info.aliases.join(', ') : ''
      ],
      ['HGNC id', '', diseasePrediction.gene_code],
      ['Entrez id', '', info.entrez],
      ['Ensembl id', '', info.ensembl],
      ['Uniprot id', '', info.uniprot],
      ['status', '', diseasePrediction.status],
      ['other assoc', '', diseasePrediction.other_associations],
      [
        'mean prediction',
        '',
        toFixed(diseasePrediction.mean_prediction) + '%',
        toFixed(diseasePrediction.mean_prediction / 100, 4)
      ],
      [
        'prediction',
        '',
        toFixed(diseasePrediction.prediction) + '%',
        toFixed(diseasePrediction.prediction / 100, 4)
      ]
    ];

    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <hr />
        <p className='left'>
          Info about{' '}
          <b>
            <i>{name}</i>
          </b>
        </p>
        <InfoTable bodyContents={bodyContents} />
      </section>
    );
  }
}
