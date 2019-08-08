import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';

export class DiseaseInfo extends Component {
  render() {
    const disease = this.props.disease || {};
    const name = disease.disease_name || '';
    const fields = [
      ['id', disease.disease_code || ''],
      ['pathophysiology', disease.pathophysiology || ''],
      ['associations', disease.associations || ''],
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
