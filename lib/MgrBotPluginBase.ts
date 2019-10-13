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

import { Repo } from './basicTypes';
import { MgrBotApplication } from './application';
import Router = require('koa-router');

interface PluginLogger {
  debug: (msg: any, ...args: any[]) => void;
  info: (msg: any, ...args: any[]) => void;
  warn: (msg: any, ...args: any[]) => void;
  error: (msg: any, ...args: any[]) => void;
}

/**
 * MgrBot plugin base class
 * Provide basic functions:
 *   1. LoadToApp static function
 *   2. app hooks on start or close
 *   3. getConfig function to get config for certain repo
 */
export abstract class MgrBotPluginBase<TConfig> {

  /**
   * Use this function to load plugin into app
   * @param name plugin name
   * @param constructor plugin class, need to derive from MgrBotPluginBase
   * @param app application
   */
  static LoadToApp<T extends MgrBotPluginBase<TConfig>, TConfig>
    (name: string, constructor: new (...args: any) => T, app: MgrBotApplication) {
    // check the plugin type should derive from base
    if (!Object.prototype.isPrototypeOf.call(MgrBotPluginBase, constructor)) {
      throw new Error(`Invalid plugin type for ${name}`);
    }
    app.logger.info(`[${name}]`, `Goona load ${name} to app`);
    app.addSingleton(name, (config: TConfig, app: MgrBotApplication) => {
      const plugin = new constructor(config, app);
      plugin.name = name;
      // save to pluginArray for later use
      app.pluginArray.push(plugin);
      return plugin;
    });
  }

  protected app: MgrBotApplication;
  protected name: string;
  protected logger: PluginLogger;

  constructor(_: TConfig, app: MgrBotApplication) {
    this.app = app;
    this.logger = {
      debug: (msg, ...args) => this.app.logger.debug(`[${this.name}]`, msg, ...args),
      info: (msg, ...args) => this.app.logger.info(`[${this.name}]`, msg, ...args),
      warn: (msg, ...args) => this.app.logger.warn(`[${this.name}]`, msg, ...args),
      error: (msg, ...args) => this.app.logger.error(`[${this.name}]`, msg, ...args),
    };
  }

  /**
   * Get config for current plugin of a certain repo
   * @param repo repo name
   */
  protected async getConfig(repo: Repo): Promise<TConfig | null> {
    const c = await this.app.configManager.getConfig(repo);
    if (!c || !c[this.name]) return null;
    return c[this.name] as TConfig;
  }

  /**
   * router for derived class to listen to a path
   * @param method request method
   * @param path request path, will append this.name prefix
   * @param middleware handler
   */
  protected router(method: 'get' | 'post' | 'put' | 'delete' | 'head',
    path: string | RegExp, ...middleware: Array<Router.IMiddleware>) {
    switch (method) {
      case 'get':
        this.app.router.get('', `/${this.name}${path}`, ...middleware);
        break;
      case 'post':
        this.app.router.post('', `/${this.name}${path}`, ...middleware);
        break;
      case 'put':
        this.app.router.put('', `/${this.name}${path}`, ...middleware);
        break;
      case 'delete':
        this.app.router.delete('', `/${this.name}${path}`, ...middleware);
        break;
      case 'head':
        this.app.router.head('', `/${this.name}${path}`, ...middleware);
        break;
    }
  }

  /**
   * When server ready
   */
  public abstract async onStart(): Promise<void>;

  /**
   * Before app close
   */
  public abstract async onClose(): Promise<void>;

}
