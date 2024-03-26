import { createExtenderPlugin } from '../factory';
import { HelloWorldComponent } from './hello-world.component';

export class HelloWorldPlugin extends createExtenderPlugin({
  name: 'Hello World',
  description: 'Hello World plugin showcasing @kompakkt/extender functionality',
  version: '1.0.0',
  tokenName: 'HelloWorldPlugin',
  viewerComponents: {
    'hello-world': [HelloWorldComponent],
  },
  repoComponents: {
    'hello-world': [HelloWorldComponent],
  },
}) {
  // Custom logic
}
