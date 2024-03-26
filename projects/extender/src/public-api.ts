/*
 * Public API Surface of extender
 */

export {
  ExtenderOptions,
  PLUGIN_COMPONENT_SET,
  PLUGIN_MANAGER,
  provideExtender,
} from './lib/extender';
export { createExtenderComponent, createExtenderPlugin } from './lib/factory';
export { HelloWorldPlugin } from './lib/hello-world/hello-world.plugin';
export { ExtenderSlotDirective } from './lib/slot.directive';
