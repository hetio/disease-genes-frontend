import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

export class GenePredictionInfo extends Component {
  // display component
  render() {
    if (!this.props.gene || !this.props.genePrediction)
      return <></>;

    const genePrediction = this.props.genePrediction;
    const name = genePrediction.disease_name;
    const info = (this.props.genePredictionInfo || {}).xref || {};
    const bodyContents = [
      ['Dis. Ont. id', '', genePrediction.disease_code],
      ['EFO id', '', info.EFO],
      ['UMLS id', '', info.UMLS_CUI],
      ['pathophysiology', '', genePrediction.pathophysiology],
      ['status', '', genePrediction.status],
      ['other assoc', '', genePrediction.other_associations],
      [
        'prediction',
        '',
        toFixed(genePrediction.prediction) + '%',
        toFixed(genePrediction.prediction / 100, 3)
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
