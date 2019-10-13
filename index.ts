export { MgrBotApplication as Application } from './lib/application';
export * from './lib/IAppEventRegistry';
export * from './lib/IConfigManager';
export * from './lib/IAppInstallationManager';
export * from './lib/MgrBotPluginBase';
export * from './lib/basicTypes';

import { MgrBotApplication as Application } from './lib/application';
import egg from 'egg';
Object.assign(exports, egg);
exports.Application = Application;
