/**
 * Copyright 2019 ZhaoShengyu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Application } from 'egg';
import { IAppEventRegistry } from './IAppEventRegistry';
import { IConfigManager } from './IConfigManager';
import { IAppInstallationManager } from './IAppInstallationManager';
import { MgrBotPluginBase } from './MgrBotPluginBase';
import * as path from 'path';

const EGG_PATH = Symbol.for('egg#eggPath');
const PLUGIN = Symbol('Application#plugin');

export class MgrBotApplication extends Application {

  event: IAppEventRegistry;
  configManager: IConfigManager;
  installation: IAppInstallationManager;

  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }

  get pluginArray(): MgrBotPluginBase<any>[] {
    if (!this[PLUGIN]) {
      this[PLUGIN] = new Array<MgrBotPluginBase<any>>();
    }
    return this[PLUGIN];
  }

  constructor(options: any = {}) {
    super(options);
    this.beforeStart(() => {
      for (const plugin of this.pluginArray) {
        (plugin as MgrBotPluginBase<any>).onStart();
      }
    });
    this.beforeClose(() => {
      for (const plugin of this.pluginArray) {
        (plugin as MgrBotPluginBase<any>).onClose();
      }
    });
  }

}
