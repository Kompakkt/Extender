/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import { Injectable, Type } from '@angular/core';
import { ExtenderPluginBaseComponent } from './factory';

export type ExtenderPluginType = 'data-provider' | 'login-provider' | 'addon-provider';

export interface ExtenderPlugin {
  tokenName?: string;
}

@Injectable({ providedIn: 'root' })
export abstract class ExtenderPlugin {
  abstract name: string;
  abstract description: string;

  abstract version: `${number}.${number}.${number}`;
  abstract type: ExtenderPluginType;
}

export abstract class ExtenderDataProviderPlugin extends ExtenderPlugin {
  type = 'data-provider' as const;
}

export abstract class ExtenderLoginProviderPlugin extends ExtenderPlugin {
  type = 'login-provider' as const;
}

export abstract class ExtenderAddonProviderPlugin extends ExtenderPlugin {
  type = 'addon-provider' as const;
  abstract viewerComponents: Record<string, Type<ExtenderPluginBaseComponent>[]>;
  abstract repoComponents: Record<string, Type<ExtenderPluginBaseComponent>[]>;
}

export type ExtenderProviderPlugin =
  | ExtenderDataProviderPlugin
  | ExtenderLoginProviderPlugin
  | ExtenderAddonProviderPlugin;
