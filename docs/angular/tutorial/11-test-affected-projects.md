# Step 11: Test Affected Projects

Because Nx understands the dependency graph of your workspace, Nx can be efficient at retesting and rebuilding your projects.

**Commit all the changes in the repo**:

```bash
git add .
git commit -am 'init'
git checkout -b testbranch
```

**Open `libs/ui/src/lib/todos/todos.component.html` and change the template:**

```html
<ul>
  <li *ngFor="let t of todos">{{ t.title }}!</li>
</ul>
```

**Run `npm run affected:apps`**, and you should see `todos` printed out. The `affected:apps` looks at what you have changed and uses the dependency graph to figure out which apps can be affected by this change.

**Run `npm run affected:libs`**, and you should see `ui` printed out. This command works similarly, but instead of printing the affected apps, it prints the affected libs.

## Test Affected Projects

Printing the affected projects can be handy, but usually you want to do something with them. For instance, you may want to test everything that has been affected.

**Run `nx affected:test` to retest only the projects affected by the change.**

You will see the following:

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

**Run `npm run affected:test -- --only-failed` to retest the failed projects.**

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
No projects to run test
The `todos` project failed as before
`Cannot run tests against master` error
