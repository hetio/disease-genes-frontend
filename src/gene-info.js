import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { compareObjects } from 'hetio-frontend-components';

const infoUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/gene-info/';

export class GeneInfo extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
    this.state.predictions = [];
  }

  // when component updates
  componentDidUpdate(prevProps) {
    console.log(this.state.info);
    if (this.props.gene && !compareObjects(prevProps.gene, this.props.gene)) {
      getInfo(this.props.gene.gene_code).then((info) => {
        this.setState({ info: info });
      });
    }
  }

  // display component
  render() {
    const gene = this.props.gene || {};
    const name = gene.gene_symbol || '-';
    const info = this.state.info || {};
    const fields = [
      [
        'aliases',
        info.aliases && info.aliases.length ? info.aliases.join(', ') : '-'
      ],
      ['HGNC id', gene.gene_code || '-'],
      ['Entrez id', info.entrez || '-'],
      ['Ensembl id', info.ensembl || '-'],
      ['Uniprot id', info.uniprot || '-'],
      ['associations', gene.associations || '-'],
      ['mean prediction', toFixed(gene.mean_prediction) + '%']
    ];

    return (
      <section>
        <hr />
        <p className='left'>
          Info about{' '}
          <b>
            <i>{name}</i>
          </b>
        </p>
        <table className='info_table'>
          <tbody>
            {fields.map((field, index) => (
              <tr key={index}>
                <td className='small left light'>{field[0]}</td>
                <td className='small left'>
                  <DynamicField value={field[1]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

async function getInfo(id) {
  const info = await (await fetch(
    infoUrl + id.replace(':', '_') + '.json'
  )).json();

  return info;
}
