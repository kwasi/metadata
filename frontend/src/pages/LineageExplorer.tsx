/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// tslint:disable: object-literal-sort-keys

import * as React from 'react';
import {Page} from './Page';
import {classes} from 'typestyle';
import {commonCss} from '../Css';
import {ToolbarProps} from '../components/Toolbar';
import {LineageCardColumn, CardDetails} from '../components/LineageCardColumn';

interface LineageExplorerState {
  columnNames: string[];
  columnTypes: string[];
}

class LineageExplorer extends Page<{}, LineageExplorerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      columnNames: ['Input Artifact', '', 'Target', '', 'Output Artifact'],
      columnTypes: ['ipa', 'ipx', 'target', 'opx', 'opa'],
    };
  }

  public getInitialToolbarState(): ToolbarProps {
    return {
      actions: [],
      breadcrumbs: [],
      pageTitle: 'Artifacts',
    };
  }

  public render(): JSX.Element {
    const {columnNames} = this.state;
    const mockInputArtifacts = [
      {title: 'Notebook', elements: [
          {title: 'Artifact 1', desc: 'This is really cool', next: true},
          {title: 'Artifact 2', desc: 'This is also kinda cool', next: true},
        ]},
      {title: 'Datasets', elements: [
          {title: 'Artifact w/o desc', prev: true, next: true},
          {title: 'Artifact that should have overflowing text', desc: 'Lorem ipsum', next: true},
        ]},
    ] as CardDetails[];
    const mockOutputArtifacts = [
      {title: 'Hyperparameters', elements: [
          {title: 'Lol', desc: 'Maybe does something', prev: true},
          {title: 'Skip factor', desc: 'How fast should I descent the gradient', prev: true, next: true},
        ]},
      {title: 'Deployments', elements: [
          {title: 'AWS Webserver', desc: 'http://foo.bar/x34s', prev: true, next: true},
          {title: 'Product API', desc: 'Hosted via GCP', prev: true},
        ]},
    ] as CardDetails[];
    const mockExec = [
      {title: 'Execution', elements: [
          {title: 'Some Process', desc: '13,201 Examples', prev: true, next: true}
        ]},
    ] as CardDetails[];
    return (
        <div className={classes(commonCss.page, 'LineageExplorer')} style={{flexFlow: 'row', overflow: 'auto', width: '100%', position: 'relative', background: '#f3f2f4', zIndex: 0}}>
          <LineageCardColumn
              type='artifact'
              cards={mockInputArtifacts}
              title={`${columnNames[0]}`} />
          <LineageCardColumn
              type='execution'
              cards={mockExec}
              title={`${columnNames[1]}`} />
          <LineageCardColumn
              type='artifact'
              cards={[Object.assign({}, mockExec[0], {title: 'Target'})]}
              title={`${columnNames[2]}`} />
          <LineageCardColumn
              type='execution'
              cards={mockExec}
              title={`${columnNames[3]}`} />
          <LineageCardColumn
              type='artifact'
              cards={mockOutputArtifacts}
              reverseBindings={true}
              title={`${columnNames[4]}`} />
        </div>
    );
  }

  public async refresh(): Promise<void> {
    // TODO: Implement this!
    // if (this.tableRef.current) {
    //   await this.tableRef.current.reload();
    // }
  }
}

export default LineageExplorer;