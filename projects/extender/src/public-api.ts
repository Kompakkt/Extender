/*
 * Public API Surface of extender
 */

export { HelloWorldPlugin } from './hello-world/hello-world.plugin';
export {
  ExtenderOptions,
  PLUGIN_COMPONENT_SET,
  PLUGIN_MANAGER,
  provideExtender,
} from './lib/extender';
export { createExtenderComponent, createExtenderPlugin } from './lib/factory';
export { ExtenderSlotDirective } from './lib/slot.directive';
