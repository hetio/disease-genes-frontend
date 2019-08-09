import React from 'react';
import { Component } from 'react';
import Chart from 'react-google-charts';

export class GeneContributions extends Component {
  // display component
  render() {
    return (
      <>
        <hr />
        <section>
          <p className='left'>
            Contributions for{' '}
            <b>
              <i>{(this.props.genePrediction || {}).disease_name || ''}</i>
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
      </>
    );
  }
}
