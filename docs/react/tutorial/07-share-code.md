# Step 7: Share Code

Awesome! The application is working end to end! However, there is a problem. Both the backend and the frontend define the `Todo` interface. The interface is in sync now, but in a real application, over time, it will diverge, and, as a result, runtime errors will creep in. You should share this interface between the backend and the frontend. In Nx, you can do this by creating a library.

**Run the following generator to create a library:**

```bash
nx g @nrwl/workspace:lib data
```

The result should look like this:

```treeview
myorg/
├── apps/
│   ├── todos/
│   ├── todos-e2e/
│   └── api/
├── libs/
│   └── data/
│       ├── src/
│       │   ├── lib/
│       │   │   └── data.ts
│       │   └── index.ts
│       ├── jest.conf.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       └── tsconfig.spec.json
├── tools/
├── nx.json
├── package.json
└── tsconfig.json
```

**Copy the interface into `libs/data/src/lib/data.ts`.**

```typescript
export interface Todo {
  title: string;
}
```

### A note about VS Code :

If you're using [VS Code](https://code.visualstudio.com/) it may be necessary at this point to restart the TS server so that the new `@myorg/data` package is recognised. This may need to be done **every time a new workspace library is added**.

## Refactor the API

**Now update `apps/api/src/app/todos.ts` to import the interface:**

```typescript
import { Express } from 'express';
import { Todo } from '@myorg/data';

const todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

export function addTodoRoutes(app: Express) {
  app.get('/api/todos', (req, resp) => resp.send(todos));
  app.post('/api/addTodo', (req, resp) => {
    const newTodo = {
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    };
    todos.push(newTodo);
    resp.send(newTodo);
  });
}
```

## Update the React Application

**Next import the interface in `apps/todos/src/app/app.tsx`:**

```typescript jsx
import React, { useEffect, useState } from 'react';
import { Todo } from '@myorg/data';

export const App = () => {
  ...
};

export default App;
```

Every time you add a new library, you have to restart `nx serve`. **So restart both `nx serve api` and `nx serve todos` and you should see the application running.**

!!!!!
Nx allows you to share code...
!!!!!
Between frontend and backend apps
Between different frontend apps
Between different node apps
