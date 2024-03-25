import { createExtenderPlugin } from '../plugin-factory';
import { HelloWorldComponent } from './hello-world.component';

export class HelloWorldPlugin extends createExtenderPlugin({
  name: 'Hello World',
  description: 'Hello World plugin',
  version: '1.0.0',
  tokenName: 'HelloWorldPlugin',
  viewerComponents: [
    {
      slot: 'hello-world',
      component: HelloWorldComponent,
    },
  ],
  repoComponents: [
    {
      slot: 'hello-world',
      component: HelloWorldComponent,
    },
  ],
}) {
  // Custom logic
}
