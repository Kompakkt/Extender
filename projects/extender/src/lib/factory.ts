import { Directive, InjectionToken, Type, input } from '@angular/core';
import { ExtenderAddonProviderPlugin } from './provider';

export const createExtenderPlugin = (options: {
  name: string;
  description: string;
  version: `${number}.${number}.${number}`;
  viewerComponents?: Record<string, Type<ExtenderPluginBaseComponent>[]>;
  repoComponents?: Record<string, Type<ExtenderPluginBaseComponent>[]>;
  tokenName?: string;
}) => {
  const providerToken = options.tokenName
    ? new InjectionToken<ExtenderAddonProviderPlugin>(
        `KOMPAKKT_EXTENDER_PLUGIN_${options.tokenName}`,
      )
    : undefined;

  return class extends ExtenderAddonProviderPlugin {
    override tokenName = options.tokenName;
    override name = options.name;
    override description = options.description;
    override version = options.version;
    override viewerComponents = options.viewerComponents ?? {};
    override repoComponents = options.repoComponents ?? {};

    static providerToken = providerToken;
  };
};

@Directive()
export class ExtenderPluginBaseComponent {
  readonly slotData = input<unknown>();
}

export const createExtenderComponent = () => {
  return class extends ExtenderPluginBaseComponent {};
};
