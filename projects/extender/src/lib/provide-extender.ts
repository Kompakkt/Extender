/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import {
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  Type,
} from '@angular/core';

export type ExtenderComponentSet = 'viewerComponents' | 'repoComponents';

export type ExtenderOptions = {
  componentSet: ExtenderComponentSet;
  plugins: ExtenderProviderPlugin[];
};

export type ExtenderPluginType = 'data-provider' | 'login-provider' | 'addon-provider';

export type ExtenderPluginComponent = {
  slot: string;
  component: Type<unknown>;
};

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
  abstract viewerComponents: ExtenderPluginComponent[];
  abstract repoComponents: ExtenderPluginComponent[];
}

export type ExtenderProviderPlugin =
  | ExtenderDataProviderPlugin
  | ExtenderLoginProviderPlugin
  | ExtenderAddonProviderPlugin;

class ExtenderPluginManager {
  readonly plugins: ExtenderProviderPlugin[] = [];

  constructor(plugins: ExtenderProviderPlugin[]) {
    this.plugins.push(...plugins);
  }

  get dataProvider(): ExtenderDataProviderPlugin | undefined {
    return this.plugins.find(
      (plugin): plugin is ExtenderDataProviderPlugin => plugin.type === 'data-provider',
    );
  }

  get loginProviders(): ExtenderLoginProviderPlugin[] {
    return this.plugins.filter(
      (plugin): plugin is ExtenderLoginProviderPlugin => plugin.type === 'login-provider',
    );
  }

  get addonProviders(): ExtenderAddonProviderPlugin[] {
    return this.plugins.filter(
      (plugin): plugin is ExtenderAddonProviderPlugin => plugin.type === 'addon-provider',
    );
  }

  public getComponentsForSlot(
    slot: string,
    componentSet: 'viewerComponents' | 'repoComponents',
  ): Type<unknown>[] {
    return this.addonProviders
      .flatMap(p => p[componentSet].filter(c => c.slot === slot))
      .map(v => v.component);
  }
}

export const PLUGIN_MANAGER = new InjectionToken<ExtenderPluginManager>(
  'KOMPAKKT_EXTENDER_PLUGIN_MANAGER',
);

export const PLUGIN_COMPONENT_SET = new InjectionToken<ExtenderComponentSet>(
  'KOMPAKKT_EXTENDER_PLUGIN_COMPONENT_SET',
);

export const provideExtender = ({
  componentSet,
  plugins,
}: ExtenderOptions): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: PLUGIN_MANAGER,
      useFactory: () => new ExtenderPluginManager(plugins),
    },
    {
      provide: PLUGIN_COMPONENT_SET,
      useValue: componentSet,
    },
    ...plugins
      .filter(p => !!(p.constructor as any)?.providerToken)
      .map(p => {
        const provide = (p.constructor as any).providerToken;
        return { provide, useValue: p };
      }),
  ]);
};
