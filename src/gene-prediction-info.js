import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class GenePredictionInfo extends Component {
  // display component
  render() {
    if (!this.props.gene || !this.props.genePrediction)
      return <></>;

    const genePrediction = this.props.genePrediction;
    const name = genePrediction.disease_name;
    const info = (this.props.genePredictionInfo || {}).xref || {};
    const bodyContents = [
      [
        'Dis. Ont. id',
        tooltipText['disease_id'],
        <a
          href={
            'http://www.disease-ontology.org/?id=' + genePrediction.disease_code
          }
        >
          {genePrediction.disease_code}
          <FontAwesomeIcon
            className='external_link_icon'
            icon={faExternalLinkAlt}
            size='xs'
          />
        </a>
      ],
      [
        'EFO id',
        tooltipText['disease_efo_id'],
        <a
          href={
            'https://www.ebi.ac.uk/ols/ontologies/EFO/terms?obo_id=EFO:' +
            info.EFO
          }
        >
          {info.EFO}
          <FontAwesomeIcon
            className='external_link_icon'
            icon={faExternalLinkAlt}
            size='xs'
          />
        </a>
      ],
      ['UMLS id', tooltipText['disease_umls_id'], info.UMLS_CUI],
      [
        'pathophysiology',
        tooltipText['disease_pathophysiology'],
        genePrediction.pathophysiology
      ],
      ['status', tooltipText['disease_status'], genePrediction.status],
      [
        'other assoc',
        tooltipText['disease_other_associations'],
        genePrediction.other_associations
      ],
      [
        'prediction',
        tooltipText['disease_prediction'],
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
