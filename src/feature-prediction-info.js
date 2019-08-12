import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class FeaturePredictionInfo extends Component {
  // display component
  render() {
    if (!this.props.feature || !this.props.featurePrediction)
      return <></>;

    const featurePrediction = this.props.featurePrediction;
    const name = featurePrediction.disease_name;
    const info = (this.props.featurePredictionInfo || {}).xref || {};
    const bodyContents = [
      [
        'Dis. Ont. id',
        tooltipText['disease_id'],
        featurePrediction.disease_code
      ],
      ['EFO id', tooltipText['disease_efo_id'], info.EFO],
      ['UMLS id', tooltipText['disease_umls_id'], info.UMLS_CUI],
      [
        'pathophysiology',
        tooltipText['disease_pathophysiology'],
        featurePrediction.pathophysiology
      ],
      [
        'associations',
        tooltipText['disease_associations'],
        featurePrediction.associations
      ],
      [
        'auroc',
        tooltipText['auroc'],
        toFixed(featurePrediction.auroc * 100) + '%',
        featurePrediction.auroc
      ],
      [
        'model auroc',
        tooltipText['model_auroc'],
        toFixed(featurePrediction.model_auroc * 100) + '%',
        featurePrediction.model_auroc
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
