import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

export class FeatureInfo extends Component {
  // display component
  render() {
    if (!this.props.feature)
      return <></>;

    const feature = this.props.feature;
    const name = feature.metapath;
    const info = this.props.featureInfo || {};
    const bodyContents = [
      ['description', '', info.description],
      ['metapath', '', info.metapath_long],
      ['metric', '', info.metric],
      ['auroc', '', toFixed(feature.auroc * 100) + '%', feature.auroc],
      ['stand coef', '', feature.standardized_coefficient]
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
