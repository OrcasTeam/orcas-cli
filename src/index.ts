#!/usr/bin/env node

import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';
import { program, Option } from 'commander';
import { PlatformType } from './types';
import { createCommand } from './command';
import { supportPlatform } from './supports';

const version = require('../package.json').version;

clear();
console.log(chalk.red.bold(figlet.textSync('mwjz-cli', { horizontalLayout: 'full' })));

program
	.version(version)
	.description('An example CLI for ordering mwjz')
	.addOption(
		new Option('-p, --platform <type>', 'select platform')
			.choices(supportPlatform())
			.default(supportPlatform()?.[0])
	);

program
	.command('create <project>')
	.description('创建项目')
	.action((project: string) => {
		const platform: PlatformType = program.opts()?.platform || 'pc';
		createCommand(project, platform).then();
	});

program
  .command('new <project>')
  .description('创建spa-template-thin项目')
  .action((project: string) => {
    const platform: PlatformType = program.opts()?.platform || 'pc';
    createCommand(project, platform, true).then();
  });

program.parse(process.argv);

