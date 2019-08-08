import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'hetio-frontend-components';
import { IconButton } from 'hetio-frontend-components';
import { assembleData } from './data.js';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toGradient } from 'hetio-frontend-components';

const tableUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/disease-tables/';

export class DiseasePredictions extends Component {
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
      (this.props.disease || {}).disease_code !==
        (prevProps.disease || {}).disease_code
    ) {
      getPredictions(this.props.disease.disease_code).then((predictions) => {
        this.setState({ predictions: predictions });
      });
    }
  }

  // display component
  render() {
    return (
      <>
        <hr />
        <section>
          <p className='left'>
            Predicted treatments for{' '}
            <b>
              <i>{(this.props.disease || {}).disease_name || ''}</i>
            </b>
          </p>
          <div className='table_attic'>
            <span className='small light'>
              {toComma(this.state.predictions.length)} entries
            </span>
            <IconButton
              text={this.state.showMore ? 'collapse' : 'expand'}
              icon={this.state.showMore ? faAngleLeft : faAngleRight}
              className='link_button small'
              onClick={() => this.setState({ showMore: !this.state.showMore })}
              tooltipText='Expand table'
            />
          </div>
          <Table
            containerClass={
              this.state.showMore
                ? 'table_container_expanded'
                : 'table_container'
            }
            data={this.state.predictions}
            defaultSortField='prediction'
            defaultSortUp='true'
            sortables={[false, true, true, true, true, true, true]}
            searchAllFields={true}
            fields={[
              '',
              'gene_code',
              'gene_symbol',
              'status',
              'other_associations',
              'mean_prediction',
              'prediction'
            ]}
            headContents={[
              '',
              'ID',
              'Name',
              'Status',
              <>
                Other
                <br />
                Assoc
              </>,
              <>
                Mean
                <br />
                Pred
              </>,
              'Prediction'
            ]}
            headStyles={[
              { width: 35 },
              { width: 100 },
              { width: 100 },
              { width: 100 },
              { width: 85 },
              { width: 85 },
              { width: 85 }
            ]}
            headClasses={[
              '',
              'small left',
              'small left',
              'small',
              'small',
              'small',
              'small'
            ]}
            headTooltips={['', '', '', '', '', '', '']}
            bodyContents={[
              (datum, field, value) => (
                <Button
                  className='check_button'
                  onClick={() => {
                    this.props.setDisease(datum);
                  }}
                >
                  <FontAwesomeIcon
                    className='fa-xs'
                    style={{ opacity: 1 }}
                    icon={faChartBar}
                  />
                </Button>
              ),
              (datum, field, value) => (
                <DynamicField value={<code>{value}</code>} fullValue={value} />
              ),
              (datum, field, value) => <DynamicField value={value} />,
              (datum, field, value) => <DynamicField value={value} />,
              (datum, field, value) => (
                <DynamicField value={value} fullValue={value} />
              ),
              (datum, field, value) => (
                <DynamicField value={toFixed(value) + '%'} fullValue={value} />
              ),
              (datum, field, value) => (
                <DynamicField value={toFixed(value) + '%'} fullValue={value} />
              )
            ]}
            bodyStyles={[
              null,
              null,
              null,
              null,
              null,
              (datum, field, value) => ({
                background: toGradient(value, [
                  [0, 'rgba(255, 255, 255, 0)'],
                  [25, 'rgba(233, 30, 99, 0.25)']
                ])
              }),
              (datum, field, value) => ({
                background: toGradient(value, [
                  [0, 'rgba(255, 255, 255, 0)'],
                  [100, 'rgba(233, 30, 99, 0.5)']
                ])
              })
            ]}
            bodyClasses={[null, 'small left', 'left']}
          />
        </section>
      </>
    );
  }
}

async function getPredictions(id) {
  const predictions = await (await fetch(
    tableUrl + id.replace(':', '_') + '.txt'
  )).text();

  return assembleData(predictions);
}