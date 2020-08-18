# Step 5: Add Node Application Implementing API

The requests fail because the API has not been created yet. Using Nx you can develop node applications next to your Angular applications. You can use same commands to run and test them. You can share code between the backend and the frontend. Use this capability to implement the API service.

## Add NestJS Plugin to Your Workspace

Nx is an open platform with plugins for many modern tools and frameworks. **To see some plugins, run `nx list`:**

```bash
>  NX  Installed plugins:

  @nrwl/angular (builders,schematics)
  @nrwl/cypress (builders,schematics)
  @nrwl/jest (builders,schematics)
  @nrwl/workspace (builders,schematics)


>  NX  Also available:

  @nrwl/bazel (schematics)
  @nrwl/express (builders,schematics)
  @nrwl/linter (builders)
  @nrwl/nest (builders,schematics)
  @nrwl/next (builders,schematics)
  @nrwl/node (builders,schematics)
  @nrwl/nx-plugin (builders,schematics)
  @nrwl/react (builders,schematics)
  @nrwl/storybook (builders,schematics)
  @nrwl/web (builders,schematics)


>  NX  Community plugins:

  @angular-architects/ddd - Nx plugin for structuring a monorepo with domains and layers
  @offeringsolutions/nx-karma-to-jest - Nx plugin for replacing karma with jest in an Nx workspace
  @dev-thought/nx-deploy-it - Nx plugin to deploy applications on your favorite cloud provider
```

**Now run `nx list @nrwl/nest`, and you will see:**

```bash
>  NX   NOTE  @nrwl/nest is not currently installed

  Use "yarn add --dev @nrwl/nest" to add new capabilities
```

**Add the dependency:**

```bash
npm install --save-dev @nrwl/nest
```

or

```bash
yarn add --dev @nrwl/nest
```

> `@nrwl/nest` also added `@nrwl/node`. Run `nx list @nrwl/nest` and `nx list @nrwl/node` to see what those plugins provide.

## Create a NestJS Application

**Run the following to generate a new Nest application:**

```bash
nx g @nrwl/nest:app api --frontendProject=todos
```

Nx will ask you a few questions, and, as with the Angular application, the defaults will work well here.

After this is done, you should see something like this:

```treeview
myorg/
├── apps/
│   ├── todos/
│   ├── todos-e2e/
│   └── api/
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.controller.ts
│       │   │   ├── app.controller.spec.ts
│       │   │   ├── app.module.ts
│       │   │   ├── app.service.ts
│       │   │   └── app.service.spec.ts
│       │   ├── assets/
│       │   ├── environments/
│       │   │   ├── environment.ts
│       │   │   └── environment.prod.ts
│       │   └── main.ts
│       ├── jest.conf.js
│       ├── proxy.conf.json
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.spec.json
│       └── tslint.json
├── libs/
├── angular.json
├── nx.json
├── package.json
├── tools/
├── tsconfig.json
└── tslint.json
```

The `apps` directory is where Nx places anything you can run: frontend applications, backend applications, e2e test suites. That's why the `api` application appeared there.

You can run:

- `nx serve api` to serve the application
- `nx build api` to build the application
- `nx test api` to test the application

**Open `apps/api/src/app/app.module.ts`.**

```typescript
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

We recommend using the [Nest](/{{framework}}/plugins/nest/overview) framework when creating node applications. Nest is a powerful framework which helps develop robust node applications. You can also use Express or any node libraries with Nx.

In this case you have an application that registers a service and a controller. Services in Nest are responsible for the business logic, and controllers are responsible for implementing Http endpoints.

**Update `apps/api/src/app/app.service.ts`:**

```typescript
import { Injectable } from '@nestjs/common';

interface Todo {
  title: string;
}

@Injectable()
export class AppService {
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  getData(): Todo[] {
    return this.todos;
  }

  addTodo() {
    this.todos.push({
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    });
  }
}
```

**Next, update the controller to invoke the service:**

```typescript
import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('todos')
  getData() {
    return this.appService.getData();
  }

  @Post('addTodo')
  addTodo() {
    return this.appService.addTodo();
  }
}
```

!!!!!
Run "nx serve api" and open http://localhost:3333/api/todos. What do you see?
!!!!!
`[{"title":"Todo 1"},{"title":"Todo 2"}]`
Blank screen
404
