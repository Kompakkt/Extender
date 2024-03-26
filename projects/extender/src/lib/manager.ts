import { Type } from '@angular/core';
import { ExtenderPluginBaseComponent } from './base-component.directive';
import {
  ExtenderAddonProviderPlugin,
  ExtenderDataProviderPlugin,
  ExtenderLoginProviderPlugin,
  ExtenderProviderPlugin,
} from './provider';

export class ExtenderPluginManager {
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
  ): Type<ExtenderPluginBaseComponent>[] {
    return this.addonProviders.flatMap(p => p?.[componentSet]?.[slot] ?? []);
  }
}
