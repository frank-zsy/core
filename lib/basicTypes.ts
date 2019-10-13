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

/**
 * Repo type
 */
export class Repo {
  owner: string;
  repo: string;

  public static fullName(r: Repo) {
    return `${r.owner}/${r.repo}`;
  }

  public static parse(repo: string): Repo {
    const s = repo.split('/');
    if (s.length !== 2) {
      return {
        owner: '',
        repo: '',
      };
    }
    return {
      owner: s[0],
      repo: s[1],
    };
  }

}
