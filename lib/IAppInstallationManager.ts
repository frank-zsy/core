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
 * Installation manager of app
 */
export interface IAppInstallationManager {
  /**
   * Get all installed repos
   */
  getInstalledRepos(): Repo[];

  /**
   * Get authenticated client(GitHub/GitLab) of a certain repo
   * @param repo repo
   */
  getClient(repo: Repo): any;
}

/**
 * When all installled repo have been retrieved
 */
export class InstallationRepoInitEvent {
  repos: Repo[];
}

/**
 * When a new repo is installed
 */
export class InstalltaionRepoAddEvent {
  repo: Repo;
}

/**
 * When a repo remove the bot
 */
export class InstallationRepoRemoveEvent {
  repo: Repo;
}
