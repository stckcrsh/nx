#!/usr/bin/env node
import './src/compat/compat';

export async function invokeCommand(
  command: string,
  root: string,
  commandArgs: string[] = []
) {
  if (command === undefined) {
    command = 'help';
  }

  let verboseFlagIndex = commandArgs.indexOf('--verbose');
  if (verboseFlagIndex < 0) {
    verboseFlagIndex = commandArgs.indexOf('-v');
  }
  const isVerbose = verboseFlagIndex >= 0;
  if (isVerbose) {
    commandArgs.splice(verboseFlagIndex, 1);
  }

  switch (command) {
    case 'new':
      return (await import('./src/commands/generate')).taoNew(
        root,
        commandArgs,
        isVerbose
      );
    case 'generate':
    case 'g':
      return (await import('./src/commands/generate')).generate(
        root,
        commandArgs,
        isVerbose
      );
    case 'run':
    case 'r':
      return (await import('./src/commands/run')).run(
        root,
        commandArgs,
        isVerbose
      );
    case 'migrate':
      return (await import('./src/commands/migrate')).migrate(
        root,
        commandArgs,
        isVerbose
      );
    case 'help':
    case '--help':
      return (await import('./src/commands/help')).help();

    default: {
      const projectNameIncluded =
        commandArgs[0] && !commandArgs[0].startsWith('-');
      const projectName = projectNameIncluded ? commandArgs[0] : '';
      // this is to make `tao test mylib` same as `tao run mylib:test`
      return (await import('./src/commands/run')).run(
        root,
        [
          `${projectName}:${command}`,
          ...(projectNameIncluded ? commandArgs.slice(1) : commandArgs),
        ],
        isVerbose
      );
    }
  }
}

export async function invokeCli(root: string, args: string[]) {
  const [command, ...commandArgs] = args;
  process.exit(await invokeCommand(command, root, commandArgs));
}

invokeCli(process.cwd(), process.argv.slice(2));
