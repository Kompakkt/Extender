import { Component, computed } from '@angular/core';
import { createExtenderComponent, createExtenderPlugin } from '../public-api';

@Component({
  selector: 'lib-hello-world',
  standalone: true,
  template: '<p>Hello {{ name() }}</p>',
  styles: '',
})
export class HelloWorldComponent extends createExtenderComponent() {
  name = computed(() => {
    const slotData = this.slotData();

    const isHelloWorldData = (obj: unknown): obj is { name: string } => {
      return typeof obj === 'object' && obj !== null && 'name' in obj;
    };

    return isHelloWorldData(slotData) ? slotData.name : 'World';
  });
}

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
