import {
  Directive,
  ElementRef,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { PLUGIN_COMPONENT_SET, PLUGIN_MANAGER } from './extender';

@Directive({
  selector: '[extendSlot]',
  standalone: true,
})
export class ExtenderSlotDirective {
  // Fields needed from Plugin Manager (Extender)
  #pluginManager = inject(PLUGIN_MANAGER);
  #componentSet = inject(PLUGIN_COMPONENT_SET);

  #viewContainerRef = inject(ViewContainerRef);
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  // User has to input the slot name, which will then be used to find the components for that slot
  extendSlot = input<string | undefined>();
  slotData = input<unknown>();

  // Create components for the slot
  #componentsForSlot = computed(() => {
    const slot = this.extendSlot();
    return slot ? this.#pluginManager.getComponentsForSlot(slot, this.#componentSet) : [];
  });
  #componentRefs = computed(() => {
    return this.#componentsForSlot().map(c => this.#viewContainerRef.createComponent(c));
  });

  constructor() {
    effect(() => {
      console.log('SlotData', this.slotData());
      console.log('SlotDirective components', this.#componentRefs());
      const refs = this.#componentRefs();
      const data = this.slotData();
      for (const ref of refs) {
        ref.setInput('slotData', data);
        this.#elementRef.nativeElement.append(ref.location.nativeElement);
      }
    });
  }
}
