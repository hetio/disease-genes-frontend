import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import { Button } from 'hetio-frontend-components';
import { IconButton } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toGradient } from 'hetio-frontend-components';
import { compareObjects } from 'hetio-frontend-components';
import { assembleData } from './data.js';

const predictionsUrl =
  'https://raw.githubusercontent.com/dhimmel/het.io-dag-data/54dd91f7c3c378b4064e8a99b022d4c637fe413f/browser/gene-tables/';

export class GenePredictions extends Component {
  // initialize component
  constructor(props) {
    super(props);

    this.state = {};
    this.state.predictions = [];
  }

  // when component updates
  componentDidUpdate(prevProps) {
    if (this.props.gene && !compareObjects(prevProps.gene, this.props.gene)) {
      getPredictions(this.props.gene.gene_code).then((predictions) => {
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
            Predictions for{' '}
            <b>
              <i>{(this.props.gene || {}).gene_symbol || ''}</i>
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
              'disease_code',
              'disease_name',
              'pathophysiology',
              'status',
              'other_associations',
              'prediction'
            ]}
            headContents={[
              '',
              'ID',
              'Name',
              <>
                Patho-
                <br />
                physiology
              </>,
              'Status',
              <>
                Other
                <br />
                Assoc
              </>,
              'Prediction'
            ]}
            headStyles={[
              { width: 25 },
              { width: 100 },
              { width: 100 },
              { width: 100 },
              { width: 75 },
              { width: 75 },
              { width: 75 }
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
                <Button className='check_button'>
                  <FontAwesomeIcon
                    className='fa-xs'
                    style={{
                      opacity: compareObjects(datum, this.props.genePrediction)
                        ? 1
                        : 0.15
                    }}
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
    predictionsUrl + id.replace(':', '_') + '.txt'
  )).text();

  return assembleData(predictions);
}
