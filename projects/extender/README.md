# Kompakkt.Extender

<p align="center">
    <img src="https://github.com/Kompakkt/Assets/raw/main/extender-logo.png" alt="Kompakkt ExtenderLogo" width="600">
</p>

Extension system for modularizing instances of Kompakkt.

## How to use Extender in Kompakkt Viewer or Repo

Use the `provideExtender`-method in the `providers` array of your ApplicationConfig (`app.config.ts`):

```ts
import { ApplicationConfig } from '@angular/core';
import { HelloWorldPlugin, provideExtender } from '@kompakkt/extender';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExtender({
      // Array of Extender Plugins
      plugins: [new HelloWorldPlugin()],
      // Name of the ComponentSet, either 'viewerComponents' or 'repoComponents'
      componentSet: 'repoComponents',
    }),
  ],
};
```

## Creating a basic plugin and how to consume it

### Plugin creating using factory pattern

The Extender library provides a factory for creating plugin classes.
The plugin requires some basic metadata, and can optionally receive components for the Repo and the Viewer, as well as a token which can be consumed as a `ProviderToken`, allowing to inject the plugin instance anywhere in the application.

```ts
import { createExtenderPlugin } from '../plugin-factory';
import { HelloWorldComponent } from './hello-world.component';

// Create a plugin class extending the factory class
export class HelloWorldPlugin extends createExtenderPlugin({
  // Required
  name: 'Hello World',
  description: 'Hello World plugin',
  version: '1.0.0',
  // Optional
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
```

### Consume plugin components using slots and ExtenderSlotDirective

Notice the `slot` names like `hello-world` in the plugin definition?

Using these slots, we can inject the components of the plugin anywhere in Kompakkt, by using the `ExtenderSlotDirective`.
Simply import the `ExtenderSlotDirective`, add it to a components' imports and use it on any HTML-tag in the template with the slot name you wish to use.

```ts
import { ExtenderSlotDirective } from '@kompakkt/extender';

@Component({
    /* ... */
    imports: [ExtenderSlotDirective]
})
```

```html
<div extendSlot="hello-world"></div>
```

### Passing data to components

Each element with the `ExtenderSlotDirective` also has an input called `slotData`.
Using this input, we can pass any data to our components.

```html
<div extendSlot="hello-world" [slotData]="{ name: 'World' }" ]></div>
```

When creating a component, you can access the `slotData` and use type guards to validate it.

```ts
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
```

### Injecting plugin using the plugin token

If a token was given to the factory, the plugin can be injected anywhere in the application.

```ts
import { Component, inject } from '@angular/core';
import { HelloWorldPlugin } from '@kompakkt/extender';

@Component({
  /*...*/
})
class ExampleComponent {
  pluginReference = inject<HelloWorldPlugin>(HelloWorldPlugin.providerToken);
}
```
