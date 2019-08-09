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

export class GenePredictions extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
  }

  // display component
  render() {
    if (!this.props.gene)
      return <></>;

    return (
      <section style={{ display: this.props.visible ? 'block' : 'none' }}>
        <hr />
        <p className='left'>
          Predictions for{' '}
          <b>
            <i>{(this.props.gene || {}).gene_symbol || ''}</i>
          </b>
        </p>
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.genePredictions.length)} entries
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
            this.state.showMore ? 'table_container_expanded' : 'table_container'
          }
          data={this.props.genePredictions}
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
          bodyTooltips={[
            (datum, field, value) =>
              'See contributions and info for "' + datum.disease_name + '"'
          ]}
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
                  onClick={() => this.props.setGenePrediction(datum)}
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
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value) + '%'}
                fullValue={toFixed(value / 100, 3)}
              />
            )
          ]}
          bodyStyles={[
            null,
            null,
            null,
            null,
            null,
            null,
            (datum, field, value) => ({
              background: toGradient(value, [
                [0, 'rgba(255, 255, 255, 0)'],
                [100, 'rgba(233, 30, 99, 0.5)']
              ])
            })
          ]}
          bodyClasses={['', 'small left', 'left']}
        />
      </section>
    );
  }
}
