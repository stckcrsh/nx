# Step 6: Proxy

You passed `--frontendProject=todos` when creating the node application. What did that argument do?

It created a proxy configuration that allows the React application to talk to the API in development.

**To see how it works, open `workspace.json` and find the `serve` target of the todos app.**

```json
{
  "serve": {
    "builder": "@nrwl/web:dev-server",
    "options": {
      "buildTarget": "todos:build",
      "proxyConfig": "apps/todos/proxy.conf.json"
    },
    "configurations": {
      "production": {
        "buildTarget": "todos:build:production"
      }
    }
  }
}
```

**Note the `proxyConfig` property.**

**Now open `proxy.conf.json`:**

```json
{
  "/api": {
    "target": "http://localhost:3333",
    "secure": false
  }
}
```

This configuration tells `nx serve` to forward all requests starting with `/api` to the process listening on port 3333.

## Workspace.json, Targets, Builders

You configure your workspaces in `workspace.json`. This file contains the workspace projects with their architect targets. For instance, `todos` has the `build`, `serve`, `lint`, and `test` targets. This means that you can run `nx build todos`, `nx serve todos`, etc..

Every target uses a builder which actually runs this target. So targets are analogous to typed npm scripts, and builders are analogous to typed shell scripts.

**Why not use shell scripts and npm scripts directly?**

There are a lot of advantages to providing additional metadata to the build tool. For instance, you can introspect targets. `nx serve todos --help` results in:

```bash
nx run todos:serve [options,...]

Options:
  --buildTarget           Target which builds the application`
  --port                  Port to listen on. (default: 4200)
  --host                  Host to listen on. (default: localhost)
  --ssl                   Serve using HTTPS.
  --sslKey                SSL key to use for serving HTTPS.
  --sslCert               SSL certificate to use for serving HTTPS.
  --watch                 Watches for changes and rebuilds application (default: true)
  --liveReload            Whether to reload the page on change, using live-reload. (default: true)
  --publicHost            Public URL where the application will be served
  --open                  Open the application in the browser.
  --allowedHosts          This option allows you to whitelist services that are allowed to access the dev server.
  --memoryLimit           Memory limit for type checking service process in MB.
  --maxWorkers            Number of workers to use for type checking.
  --help                  Show available options for project target.
```

It helps with good editor integration (see [VSCode Support](https://nx.dev/react/cli/console)).

But, most importantly, it provides a holistic dev experience regardless of the tools used, and enables advanced build features like distributed computation caching and distributed builds).

!!!!!
Now run both "nx serve todos" and "nx serve api" in separate terminals, open http://localhost:4200. What do you see?
!!!!!
Todos application is working!
404 in the console
Todos are displayed but the Add Todo button doesn't work
