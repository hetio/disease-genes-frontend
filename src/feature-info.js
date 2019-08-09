import React from 'react';
import { Component } from 'react';

import { toFixed } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { compareObjects } from 'hetio-frontend-components';

const infoUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/feature-info/';

export class FeatureInfo extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
    this.state.predictions = [];
  }

  // when component updates
  componentDidUpdate(prevProps) {
    if (
      this.props.feature &&
      !compareObjects(prevProps.feature, this.props.feature)
    ) {
      getInfo(this.props.feature.feature).then((info) => {
        this.setState({ info: info });
      });
    }
  }

  // display component
  render() {
    const feature = this.props.feature || {};
    const name = feature.metapath || '-';
    const info = this.state.info || {};
    const fields = [
      ['description', info.description || '-'],
      ['metapath', info.metapath_long || '-'],
      ['metric', info.metric || '-'],
      ['auroc', toFixed(feature.auroc) + '%'],
      ['stand coef', feature.standardized_coefficient || '-']
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
  const info = await (await fetch(infoUrl + id + '.json')).json();

  return info;
}
