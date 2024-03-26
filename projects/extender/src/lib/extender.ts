import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { ExtenderPluginManager } from './manager';
import { ExtenderProviderPlugin } from './provider';

export type ExtenderOptions = {
  componentSet: 'viewerComponents' | 'repoComponents';
  plugins: ExtenderProviderPlugin[];
};

export const PLUGIN_MANAGER = new InjectionToken<ExtenderPluginManager>(
  'KOMPAKKT_EXTENDER_PLUGIN_MANAGER',
);

export const PLUGIN_COMPONENT_SET = new InjectionToken<ExtenderOptions['componentSet']>(
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
