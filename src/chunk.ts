import inquirer from 'inquirer';
import { FrameType, ScaffoldType, UIType, VersionType } from './types';
import { supportFrames, supportPCScaffold, supportUI, supportVersion } from './supports';
const author = require('../package.json').author;
const urlPrefix = `https://github.com:${author.name}`;

const LINE_MATCH = /\n|\r|\r\n|\s/g;

async function framePrompt(): Promise<FrameType> {
	const promptList = [
		{
			type: 'list',
			message: '请选择框架:',
			name: 'frame',
			choices: supportFrames(),
			filter: (val: FrameType) => val.toLowerCase(),
		},
	];

	const data: { frame: FrameType } = await inquirer.prompt(promptList);
	return data.frame;
}

async function versionPrompt(frame: FrameType): Promise<VersionType> {
	const promptList = [
		{
			type: 'list',
			message: '请选择版本:',
			name: 'version',
			choices: supportVersion(frame),
		},
	];

	const data: { version: VersionType } = await inquirer.prompt(promptList);
	return data.version;
}

async function scaffoldPrompt(version: VersionType): Promise<ScaffoldType> {
	const promptList = [
		{
			type: 'list',
			message: '请选择脚手架:',
			name: 'scaffold',
			choices: supportPCScaffold(version),
			filter: (val: ScaffoldType) => val.toLowerCase(),
		},
	];

	const data: { scaffold: ScaffoldType } = await inquirer.prompt(promptList);
	return data.scaffold;
}

async function uiPrompt(): Promise<UIType> {
	const promptList = [
		{
			type: 'list',
			message: '请选择UI框架:',
			name: 'ui',
			choices: supportUI(),
			filter: (val: UIType) => val.toLowerCase(),
		},
	];

	const data: { ui: UIType } = await inquirer.prompt(promptList);
	return data.ui;
}

export async function getUrl(): Promise<string> {
	const frame = await framePrompt();
	const version = await versionPrompt(frame);
	const ui = await uiPrompt();
	const worker = await scaffoldPrompt(version);

	const template = {
		vue: 'vue-template',
		react: 'react-template',
	};

	const url = `${urlPrefix}/
	${template[frame]}#
	${worker}-
    ${ui !== 'none' ? ui + '-' : ''}
	${version}`;

	return url.replace(LINE_MATCH, '');
}
