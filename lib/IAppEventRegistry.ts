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
 * App event registry
 * Can subscribe and publish event by class type
 */
export interface IAppEventRegistry {
  /**
   * To subscribe a certain event
   * @param constructor event type class
   * @param func event handler
   */
  subscribe<T>(constructor: new (...args: any) => T, func: AppEventHandler<T>): void;

  /**
   * To publish a certain event
   * @param constructor event type class
   * @param param event context
   */
  publish<T>(constructor: new (...args: any) => T, param: T): Promise<void>;

}

/**
 * App event handler type
 */
export type AppEventHandler<T> = (event: T) => Promise<void>;
