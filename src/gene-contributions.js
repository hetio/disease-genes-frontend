import React from 'react';
import { Component } from 'react';
import Chart from 'react-google-charts';

export class GeneContributions extends Component {
  // display component
  render() {
    if (!this.props.gene || !this.props.genePrediction)
      return <></>;

    const diseaseName = (this.props.genePrediction || {}).disease_name || '';
    const geneName = (this.props.gene || {}).gene_symbol || '';

    return (
      <div
        className='app_section'
        style={{ display: this.props.visible ? 'block' : 'none' }}
      >
        <hr />
        <p className='left'>
          Contributions for{' '}
          <b>
            <i>{diseaseName}</i>
          </b>
        </p>
        <p className='small light left'>
          This chart shows the contribution of each feature towards the overall
          prediction, where the contribution equals the feature coefficient from
          the logistic ridge regression model times the feature value computed
          between the selected gene and disease.
        </p>
        <Chart
          chartType='BarChart'
          width='100%'
          height='500px'
          data={this.props.contributions}
          options={{
            legend: 'none',
            backgroundColor: 'none',
            colors: ['#02b3e4'],
            title:
              'Components of the predicted association between ' +
              diseaseName +
              ' and ' +
              geneName,
            hAxis: {
              title: 'Contribution'
            },
            vAxis: {
              title: 'Feature'
            },
            chartArea: {
              left: '20%',
              top: '50',
              width: '80%',
              height: '400'
            }
          }}
        />
      </div>
    );
  }
}
