# Angular Plugin

The Nx Plugin for Angular contains builders, schematics, and utilities for managing Angular applications, and libraries within an Nx workspace. It provides:

- Integration with libraries such as Jest, Cypress, Karma, Protractor, and Storybook.
- Helper services, and functions to use along with NgRx libraries.
- Scaffolding for upgrading AngularJS applications.
- Scaffolding for creating buildable libraries that can be published to npm.
- Utilities for automatic workspace refactoring.

## Adding the Angular plugin

Adding the Angular plugin to a workspace can be done with the following:

```shell script
#yarn
yarn add -D @nrwl/angular
```

```shell script
#npm
npm install -D @nrwl/angular
```

## Angular Projects in an Nx Workspace

Building Angular applications within an Nx workspace is similar to building within a vanilla Angular CLI workspace, with a few differences.

- Jest is used as the default unit test runner, configurable in the schematics section of the workspace configuration file.
- Cypress is used as the default E2E test runner, configurable in the schematics section of the workspace configuration.
- E2E tests are included in a separate project from the Angular application itself.
- The Nx CLI delegates common commands such as build, serve, test, lint, and e2e to the Angular CLI.

The file structure for an Angular application looks like:

```treeview
myorg/
├── apps/
│   ├── myapp/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── assets/
│   │   │   ├── environments/
│   │   │   ├── favicon.ico
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   ├── polyfills.ts
│   │   │   ├── styles.scss
│   │   │   └── test.ts
│   │   ├── browserslist
│   │   ├── jest.conf.js
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.spec.json
│   │   └── tslint.json
│   └── myapp-e2e/
│       ├── src/
│       │   ├── fixtures/
│       │   │   └── example.json
│       │   ├── integration/
│       │   │   └── app.spec.ts
│       │   ├── plugins/
│       │   │   └── index.ts
│       │   └── support/
│       │       ├── app.po.ts
│       │       ├── commands.ts
│       │       └── index.ts
│       ├── cypress.json
│       ├── tsconfig.e2e.json
│       ├── tsconfig.json
│       └── tslint.json
├── libs/
├── tools/
├── angular.json
├── nx.json
├── package.json
├── tsconfig.json
├── tslint.json
└── README.md
```

## See Also

- [Using DataPersistence](/{{framework}}/guides/misc-data-persistence)
- [Using NgRx](/{{framework}}/guides/misc-ngrx)
- [Upgrading an AngularJS application to Angular](/{{framework}}/guides/misc-angular)

## Builders

- [package](/{{framework}}/plugins/angular/builders/package) - Bundles artifacts for a buildable library that can be distributed as an NPM package.

## Schematics

- [application](/{{framework}}/plugins/angular/schematics/application) - Create an Angular application
- [downgrade-module](/{{framework}}/plugins/angular/schematics/downgrade-module) - Setup Downgrade Module
- [karma](/{{framework}}/plugins/angular/schematics/karma) - Add karma configuration to a workspace
- [karma-project](/{{framework}}/plugins/angular/schematics/karma-project) - Add karma testing to a project
- [library](/{{framework}}/plugins/angular/schematics/library) - Create an Angular library
- [move](/{{framework}}/plugins/angular/schematics/move) - Move an Angular application or library to another folder within the workspace
- [ngrx](/{{framework}}/plugins/angular/schematics/ngrx) - Add and use NgRx for state management
- [stories](/{{framework}}/plugins/angular/schematics/stories) - Create stories/specs for all components declared in a library
- [storybook-configuration](/{{framework}}/plugins/angular/schematics/storybook-configuration) - Setup configuration for Storybook
- [upgrade-module](/{{framework}}/plugins/angular/schematics/upgrade-module) - Add an upgrade module

## Public API

- DataPersistence - Angular Service that provides convenience methods for common operations of persisting data.
- fetch - Handles data fetching, and correct ordering of fetching using NgRx Effects
- navigation - Handles data fetching based on navigating to a certain component using NgRx Effects
- optimisticUpdate - Handles optimistic updates (updating the client first) using NgRx Effects.
- pessimisticUpdate - Handles pessimistic updates (updating the server first) fetching using NgRx Effects.
  NxModule - An NgModule used to register the Angular providers, including DataPersistence.
