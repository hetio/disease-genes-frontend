import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class FeatureInfo extends Component {
  // display component
  render() {
    if (!this.props.feature)
      return <></>;

    const feature = this.props.feature;
    const name = feature.metapath;
    const info = this.props.featureInfo || {};
    const bodyContents = [
      ['description', tooltipText['metapath_description'], info.description],
      ['metapath', tooltipText['metapath_full'], info.metapath_long],
      ['metric', tooltipText['metapath_metric'], info.metric],
      [
        'auroc',
        tooltipText['metapath_auroc'],
        toFixed(feature.auroc * 100) + '%',
        feature.auroc
      ],
      [
        'stand coef',
        tooltipText['metapath_coefficient'],
        toFixed(feature.auroc, 2),
        feature.standardized_coefficient
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
