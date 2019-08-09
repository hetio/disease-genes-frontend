import React from 'react';
import { Component } from 'react';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from 'hetio-frontend-components';
import { DynamicField } from 'hetio-frontend-components';
import { Table } from 'hetio-frontend-components';
import { toComma } from 'hetio-frontend-components';
import { toFixed } from 'hetio-frontend-components';
import { toGradient } from 'hetio-frontend-components';

export class FeaturePredictions extends Component {
  // display component
  render() {
    return (
      <>
        <hr />
        <section>
          <p className='left'>
            Predictions for{' '}
            <b>
              <i>{(this.props.feature || {}).metapath || ''}</i>
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
            sortables={[true, true, true, true, true, true]}
            searchAllFields={true}
            fields={[
              'disease_code',
              'disease_name',
              'pathophysiology',
              'associations',
              'model_auroc',
              'auroc'
            ]}
            headContents={[
              'ID',
              'Name',
              <>
                Patho-
                <br />
                physiology
              </>,
              'Assoc',
              'AUROC',
              <>
                Model
                <br />
                AUROC
              </>
            ]}
            headStyles={[
              { width: 75 },
              { width: 150 },
              { width: 100 },
              { width: 75 },
              { width: 75 },
              { width: 75 }
            ]}
            headClasses={[
              'small left',
              'small left',
              'small',
              'small',
              'small',
              'small'
            ]}
            bodyContents={[
              (datum, field, value) => (
                <DynamicField value={<code>{value}</code>} fullValue={value} />
              ),
              (datum, field, value) => <DynamicField value={value} />,
              (datum, field, value) => <DynamicField value={value} />,
              (datum, field, value) => (
                <DynamicField value={value} fullValue={value} />
              ),
              (datum, field, value) => (
                <DynamicField
                  value={toFixed(value * 100) + '%'}
                  fullValue={value}
                />
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
              (datum, field, value) => ({
                background: toGradient(value * 100, [
                  [0, 'rgba(255, 255, 255, 0)'],
                  [100, 'rgba(233, 30, 99, 0.5)']
                ])
              }),
              (datum, field, value) => ({
                background: toGradient(value * 100, [
                  [0, 'rgba(255, 255, 255, 0)'],
                  [100, 'rgba(233, 30, 99, 0.5)']
                ])
              })
            ]}
            bodyClasses={['small left', 'left']}
          />
        </section>
      </>
    );
  }
}
