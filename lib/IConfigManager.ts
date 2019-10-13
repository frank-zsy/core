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

/**
 * Config manager of app
 */
export interface IConfigManager {
  /**
   * Get config of a certain repo
   * @param repo repo
   */
  getConfig(repo: Repo): any;
}

/**
 * When a repo's config is loaded
 */
export class ConfigLoadedEvent<T> {
  repo: Repo;
  config: T;
}

/**
 * When a repo's config is updated
 */
export class ConfigUpdatedEvent<T> {
  repo: Repo;
  config: T;
}
