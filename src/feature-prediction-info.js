import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

export class FeaturePredictionInfo extends Component {
  // display component
  render() {
    if (!this.props.feature || !this.props.featurePrediction)
      return <></>;

    const featurePrediction = this.props.featurePrediction;
    const name = featurePrediction.disease_name;
    const info = (this.props.featurePredictionInfo || {}).xref || {};
    const bodyContents = [
      ['Dis. Ont. id', '', featurePrediction.disease_code],
      ['EFO id', '', info.EFO],
      ['UMLS id', '', info.UMLS_CUI],
      ['pathophysiology', '', featurePrediction.pathophysiology],
      ['associations', '', featurePrediction.associations],
      [
        'auroc',
        '',
        toFixed(featurePrediction.auroc * 100) + '%',
        featurePrediction.auroc
      ],
      [
        'model auroc',
        '',
        toFixed(featurePrediction.model_auroc * 100) + '%',
        featurePrediction.model_auroc
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
