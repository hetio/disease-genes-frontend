import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { Button } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toGradient } from 'hetio-frontend-components';
import { compareObjects } from 'hetio-frontend-components';

export class Genes extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
  }

  // display component
  render() {
    return (
      <div className='app_section' style={{ display: this.props.visible ? 'block' : 'none' }}>
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.genes.length)} entries
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
          data={this.props.genes}
          defaultSortField='mean_prediction'
          defaultSortUp='true'
          sortables={[false, true, true, true, true, true]}
          searchAllFields={true}
          fields={[
            '',
            'gene_code',
            'gene_symbol',
            'associations',
            'mean_prediction'
          ]}
          headContents={[
            '',
            'ID',
            'Name',
            'Assoc',
            <>
              Mean
              <br />
              Pred
            </>
          ]}
          headStyles={[
            { width: 25 },
            { width: 100 },
            { width: 100 },
            { width: 75 },
            { width: 75 }
          ]}
          headClasses={['', 'small left', 'small left', 'small', 'small']}
          bodyTooltips={[
            (datum, field, value) =>
              'See predictions and info for "' + datum.gene_symbol + '"'
          ]}
          bodyContents={[
            (datum, field, value) => (
              <Button
                className='check_button'
                onClick={() => {
                  this.props.setGene(datum);
                }}
              >
                <FontAwesomeIcon
                  className='fa-xs'
                  style={{
                    opacity: compareObjects(datum, this.props.gene) ? 1 : 0.15
                  }}
                  icon={faEye}
                />
              </Button>
            ),
            (datum, field, value) => (
              <DynamicField value={<code>{value}</code>} fullValue={value} />
            ),
            (datum, field, value) => <DynamicField value={value} />,
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
            (datum, field, value) => ({
              background: toGradient(value, [
                [0, 'rgba(255, 255, 255, 0)'],
                [25, 'rgba(233, 30, 99, 0.5)']
              ])
            })
          ]}
          bodyClasses={['', 'small left', 'left']}
        />
      </div>
    );
  }
}
