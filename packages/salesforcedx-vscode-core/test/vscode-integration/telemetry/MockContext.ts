/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as path from 'path';
import {
  EnvironmentVariableCollection,
  EnvironmentVariableMutator,
  ExtensionContext,
  Memento,
  Uri
} from 'vscode';

class MockMemento implements Memento {
  private telemetryGS: boolean;

  constructor(setGlobalState: boolean) {
    this.telemetryGS = setGlobalState;
  }

  public get(key: string): any {
    if (this.telemetryGS === true) {
      return true;
    }
    return undefined;
  }

  public update(key: string, value: any): Promise<void> {
    return Promise.resolve();
  }
}

class MockEnvironmentVariableCollection
  implements EnvironmentVariableCollection {
  public persistent: boolean = true;
  public replace(variable: string, value: string): void {}
  public append(variable: string, value: string): void {}
  public prepend(variable: string, value: string): void {}
  public get(variable: string): EnvironmentVariableMutator | undefined {
    return undefined;
  }
  public forEach(
    callback: (
      variable: string,
      mutator: EnvironmentVariableMutator,
      collection: EnvironmentVariableCollection
    ) => any,
    thisArg?: any
  ): void {}
  public delete(variable: string): void {}
  public clear(): void {}
}

export class MockContext implements ExtensionContext {
  constructor(mm: boolean) {
    this.globalState = new MockMemento(mm);
  }
  public subscriptions: Array<{ dispose(): any }> = [];
  public workspaceState!: Memento;
  public globalState: Memento;
  public extensionPath: string = 'myExtensionPath';
  public globalStoragePath = 'globalStatePath';
  public logPath = 'logPath';
  public asAbsolutePath(relativePath: string): string {
    return path.join('../../../package.json'); // this should point to the src/package.json
  }
  public storagePath: string = 'myStoragePath';
  public extensionUri: Uri = Uri.file('mockExtensionUri');
  public environmentVariableCollection = new MockEnvironmentVariableCollection();
}
