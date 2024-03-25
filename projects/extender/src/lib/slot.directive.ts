import {
  Directive,
  ElementRef,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { PLUGIN_COMPONENT_SET, PLUGIN_MANAGER } from './provide-extender';

@Directive({
  selector: '[extendSlot]',
  standalone: true,
})
export class SlotDirective {
  // Fields needed from Plugin Manager (Extender)
  #pluginManager = inject(PLUGIN_MANAGER);
  #componentSet = inject(PLUGIN_COMPONENT_SET);

  #viewContainerRef = inject(ViewContainerRef);
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #injector = this.#viewContainerRef.injector;

  // User has to input the slot name, which will then be used to find the components for that slot
  extendSlot = input.required<string>();
  #componentsForSlot = computed(() => {
    return this.#pluginManager.getComponentsForSlot(this.extendSlot(), this.#componentSet);
  });

  constructor() {
    console.log('SlotDirective constructor');
    effect(() => {
      this.#viewContainerRef.clear();
      const components = this.#componentsForSlot();
      console.log('SlotDirective components', components);
      for (const component of components) {
        const ref = this.#viewContainerRef.createComponent(component);
        this.#elementRef.nativeElement.append(ref.location.nativeElement);
      }
    });
  }
}
