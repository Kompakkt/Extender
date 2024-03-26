import { Directive, input } from '@angular/core';

@Directive()
export class ExtenderPluginBaseComponent {
  readonly slotData = input<unknown>();
}
