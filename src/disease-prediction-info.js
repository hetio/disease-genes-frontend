import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

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
      [
        'HGNC id',
        tooltipText['gene_id'],

        <a
          href={
            'https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/' +
            diseasePrediction.gene_code
          }
        >
          {diseasePrediction.gene_code}
          <FontAwesomeIcon
            className='external_link_icon'
            icon={faExternalLinkAlt}
            size='xs'
          />
        </a>
      ],
      [
        'Entrez id',
        tooltipText['gene_entrez_id'],
        <a href={'https://www.ncbi.nlm.nih.gov/gene/' + info.entrez}>
          {info.entrez}
          <FontAwesomeIcon
            className='external_link_icon'
            icon={faExternalLinkAlt}
            size='xs'
          />
        </a>
      ],
      [
        'Ensembl id',
        tooltipText['gene_ensembl_id'],
        <a
          href={
            'http://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=' +
            info.ensembl
          }
        >
          {info.ensembl}
          <FontAwesomeIcon
            className='external_link_icon'
            icon={faExternalLinkAlt}
            size='xs'
          />
        </a>
      ],
      [
        'Uniprot id',
        tooltipText['gene_uniprot_id'],
        <a href={'https://www.uniprot.org/uniprot/' + info.uniprot}>
          {info.uniprot}
          <FontAwesomeIcon
            className='external_link_icon'
            icon={faExternalLinkAlt}
            size='xs'
          />
        </a>
      ],
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
