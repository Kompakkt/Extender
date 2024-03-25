import { InjectionToken } from '@angular/core';
import { ExtenderAddonProviderPlugin, ExtenderPluginComponent } from './provide-extender';

export const createExtenderPlugin = (options: {
  name: string;
  description: string;
  version: `${number}.${number}.${number}`;
  viewerComponents?: ExtenderPluginComponent[];
  repoComponents?: ExtenderPluginComponent[];
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
    override viewerComponents = options.viewerComponents ?? [];
    override repoComponents = options.repoComponents ?? [];

    static providerToken = providerToken;
  };
};
