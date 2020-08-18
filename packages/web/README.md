<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx.png" width="600"></p>

{{links}}

<hr>

# Web Plugin for Nx

{{what-is-nx}}

{{getting-started}}

```angular    [a workspace with a single Angular application]
? Workspace name (e.g., org name) happyorg ? What to create in the new workspace
web components [a workspace with a single app built using web components] ?
Application name myapp ? Default stylesheet format CSS
```

If it's your first Nx project, the command will recommend you to install the `nx` package globally, so you can invoke `nx` directly without going through yarn or npm.

### Serving Application

- Run `nx serve myapp` to serve the newly generated application!
- Run `nx test myapp` to test it.
- Run `nx e2e myapp-e2e` to run e2e tests for it.

### Adding Web Plugin Into an Existing Workspace

You can always add the web plugin to an existing workspace by installing `@nrwl/web` and then generating a web components application, as follows: `nx g @nrwl/web:app myapp`.

{{resources}}
