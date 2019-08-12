import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

import tooltipText from './tooltip-text.json';

export class GeneInfo extends Component {
  // display component
  render() {
    if (!this.props.gene)
      return <></>;

    const gene = this.props.gene;
    const name = gene.gene_symbol;
    const info = this.props.geneInfo || {};
    const bodyContents = [
      [
        'aliases',
        tooltipText['gene_aliases'],
        info.aliases && info.aliases.length ? info.aliases.join(', ') : ''
      ],
      ['HGNC id', tooltipText['gene_id'], gene.gene_code],
      ['Entrez id', tooltipText['gene_entrez_id'], info.entrez],
      ['Ensembl id', tooltipText['gene_ensembl_id'], info.ensembl],
      ['Uniprot id', tooltipText['gene_uniprot_id'], info.uniprot],
      ['associations', tooltipText['gene_associations'], gene.associations],
      [
        'mean prediction',
        tooltipText['gene_mean_prediction'],
        toFixed(gene.mean_prediction) + '%',
        toFixed(gene.mean_prediction / 100, 3)
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
