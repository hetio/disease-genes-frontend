import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { compareObjects } from 'hetio-frontend-components';

const infoUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/disease-info/';

export class DiseaseInfo extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
    this.state.predictions = [];
  }

  // when component updates
  componentDidUpdate(prevProps) {
    if (
      this.props.disease &&
      !compareObjects(prevProps.disease, this.props.disease)
    ) {
      getInfo(this.props.disease.disease_code).then((info) => {
        this.setState({ info: info });
      });
    }
  }

  // display component
  render() {
    const disease = this.props.disease || {};
    const name = disease.disease_name || '-';
    const info = (this.state.info || {}).xref || {};
    const fields = [
      ['Dis. Ont. id', disease.disease_code || '-'],
      ['EFO id', info.EFO || '-'],
      ['UMLS id', info.UMLS_CUI || '-'],
      ['pathophysiology', disease.pathophysiology || '-'],
      ['associations', disease.associations || '-'],
      ['auroc', toFixed(disease.auroc * 100) + '%']
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
