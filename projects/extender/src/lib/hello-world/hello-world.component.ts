import { Component, computed } from '@angular/core';
import { createExtenderComponent } from '../factory';

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
