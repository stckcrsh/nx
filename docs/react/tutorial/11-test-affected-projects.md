# Step 11: Test Affected Projects

In addition to supporting computation caching, Nx can scale your development by doing code change analysis to see what can affected by a particular pull request.

**Commit all the changes in the repo**:

```bash
git add .
git commit -am 'init'
git checkout -b testbranch
```

**Open `libs/ui/src/lib/todos/todos.tsx` and change the component:**

```typescript jsx
import React from 'react';
import { Todo } from '@myorg/data';

export const Todos = (props: { todos: Todo[] }) => {
  return (
    <ul>
      {props.todos.map((t) => (
        <li className={'todo'}>{t.title}!!</li>
      ))}
    </ul>
  );
};

export default Todos;
```

**Run `nx affected:apps`**, and you should see `todos` printed out. The `affected:apps` looks at what you have changed and uses the dependency graph to figure out which apps can be affected by this change.

**Run `nx affected:libs`**, and you should see `ui` printed out. This command works similarly, but instead of printing the affected apps, it prints the affected libs.

## Test Affected Projects

Printing the affected projects can be handy, but usually you want to do something with them. For instance, you may want to test everything that has been affected.

**Run `nx affected:test` to retest only the projects affected by the change.**

As you can see, since we updated the code, without updating the tests, the unit tests failed.

```bash
>  NX  Running target test for projects:

  - ui
  - todos

...

  Failed projects:

  - todos
  - ui
```

Note that Nx only tried to retest `ui` and `todos`. It didn't retest `api` or `data` because there is no way that could be affected by the changes in this branch.

## Affected:\*

You can run any target against the affected projects in the graph like this:

```bash
# The following are equivalent
nx affected --target=build
nx affected:build
```

!!!!!
Run "nx affected --target=invalid --base=master". What do you see?
!!!!!
No projects with "invalid" were run
An error message saying that the "invalid" target is invalid
