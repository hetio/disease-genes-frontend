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

import tooltipText from './tooltip-text.json';

export class Diseases extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
  }

  // display component
  render() {
    return (
      <div
        className='app_section'
        style={{ display: this.props.visible ? 'block' : 'none' }}
      >
        <div className='table_attic'>
          <span className='small light'>
            {toComma(this.props.diseases.length)} entries
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
          data={this.props.diseases}
          defaultSortField='auroc'
          defaultSortUp='true'
          sortables={[false, true, true, true, true, true]}
          searchAllFields={true}
          fields={[
            '',
            'disease_code',
            'disease_name',
            'pathophysiology',
            'associations',
            'auroc'
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
            'Assoc',
            'AUROC'
          ]}
          headStyles={[
            { width: 25 },
            { width: 100 },
            { width: 200 },
            { width: 100 },
            { width: 75 },
            { width: 75 }
          ]}
          headClasses={[
            '',
            'small left',
            'small left',
            'small',
            'small',
            'small'
          ]}
          headTooltips={[
            '',
            tooltipText['disease_id'],
            tooltipText['disease_name'],
            tooltipText['disease_pathophysiology'],
            tooltipText['disease_associations'],
            tooltipText['auroc']
          ]}
          bodyTooltips={[
            (datum, field, value) =>
              'See predictions and info for "' + datum.disease_name + '"'
          ]}
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
                  style={{
                    opacity: compareObjects(datum, this.props.disease)
                      ? 1
                      : 0.15
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
              <DynamicField value={toComma(value)} fullValue={value} />
            ),
            (datum, field, value) => (
              <DynamicField
                value={toFixed(value * 100) + '%'}
                fullValue={value}
              />
            )
          ]}
          bodyStyles={[
            null,
            null,
            null,
            null,
            null,
            (datum, field, value) => ({
              background: toGradient(value * 100, [
                [0, 'rgba(255, 255, 255, 0)'],
                [50, 'rgba(255, 255, 255, 0)'],
                [100, 'rgba(233, 30, 99, 0.5)']
              ])
            })
          ]}
          bodyClasses={['', 'small left', 'left']}
        />
      </div>
    );
  }
}
