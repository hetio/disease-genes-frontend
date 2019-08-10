import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

export class DiseaseInfo extends Component {
  // display component
  render() {
    if (!this.props.disease)
      return <></>;

    const disease = this.props.disease;
    const name = disease.disease_name;
    const info = (this.props.diseaseInfo || {}).xref || {};
    const bodyContents = [
      ['Dis. Ont. id', '', disease.disease_code],
      ['EFO id', '', info.EFO],
      ['UMLS id', '', info.UMLS_CUI],
      ['pathophysiology', '', disease.pathophysiology],
      ['associations', '', disease.associations],
      ['auroc', '', toFixed(disease.auroc * 100) + '%', disease.auroc]
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
