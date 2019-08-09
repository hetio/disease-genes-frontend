import React from 'react';
import { Component } from 'react';
import Chart from 'react-google-charts';

export class DiseaseContributions extends Component {
  // display component
  render() {
    if (!this.props.disease || !this.props.diseasePrediction)
      return <></>;

    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <hr />
        <p className='left'>
          Contributions for{' '}
          <b>
            <i>{(this.props.diseasePrediction || {}).gene_symbol || ''}</i>
          </b>
        </p>
        <Chart
          chartType='BarChart'
          width='100%'
          height='500px'
          data={this.props.contributions}
          options={{
            legend: 'none',
            backgroundColor: 'none',
            chartArea: {
              left: '20%',
              top: '0',
              width: '80%',
              height: '480'
            }
          }}
        />
      </section>
    );
  }
}
