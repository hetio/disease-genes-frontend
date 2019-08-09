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

export class Features extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
  }

  // display component
  render() {
    return (
      <section>
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.features.length)} entries
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
          data={this.props.features}
          defaultSortField='standardized_coefficient'
          defaultSortUp='true'
          sortables={[false, true, true, true, true, true]}
          searchAllFields={true}
          fields={[
            '',
            'metapath',
            'metric',
            'auroc',
            'standardized_coefficient'
          ]}
          headContents={[
            '',
            'Metapath',
            'Metric',
            'AUROC',
            <>
              Stand
              <br />
              Coef
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
              'See predictions for "' + datum.metapath + '"'
          ]}
          bodyContents={[
            (datum, field, value) => (
              <Button
                className='check_button'
                onClick={() => {
                  this.props.setFeature(datum);
                }}
              >
                <FontAwesomeIcon
                  className='fa-xs'
                  style={{
                    opacity: compareObjects(datum, this.props.feature)
                      ? 1
                      : 0.15
                  }}
                  icon={faEye}
                />
              </Button>
            ),
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField value={toFixed(value * 100) + '%'} />
            ),
            (datum, field, value) => <DynamicField value={value} />
          ]}
          bodyStyles={[
            null,
            null,
            null,
            (datum, field, value) => ({
              background: toGradient(value * 100, [
                [50, 'rgba(255, 255, 255, 0)'],
                [75, 'rgba(233, 30, 99, 0.5)']
              ])
            })
          ]}
          bodyClasses={[null, 'small left', 'left']}
        />
      </section>
    );
  }
}
