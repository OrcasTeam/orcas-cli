#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program, Option } from 'commander';
import { platforms } from './supports';
import { PlatformType } from './types';
import { createCommand } from './command';

const version = require('../package.json').version;

clear();
console.log(chalk.red(figlet.textSync('orca-cli', { horizontalLayout: 'full' })));

program
	.version(version)
	.description('An example CLI for ordering orca')
	.addOption(
		new Option('-p, --platform <type>', 'select platform')
			.choices(platforms())
			.default(platforms()?.[0])
	);

program
	.command('create <project>')
	.description('创建项目')
	.action((project: string) => {
		const platform: PlatformType = program.opts()?.platform || 'pc';
		createCommand(project, platform);
	});

program.parse(process.argv);
