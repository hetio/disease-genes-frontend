import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { InfoTable } from 'hetio-frontend-components';

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
        info.aliases && info.aliases.length ? info.aliases.join(', ') : ''
      ],
      ['HGNC id', '', gene.gene_code],
      ['Entrez id', '', info.entrez],
      ['Ensembl id', '', info.ensembl],
      ['Uniprot id', '', info.uniprot],
      ['associations', '', gene.associations],
      [
        'mean prediction',
        '',
        toFixed(gene.mean_prediction) + '%',
        toFixed(gene.mean_prediction / 100, 3)
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
