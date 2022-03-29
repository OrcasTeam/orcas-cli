import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import rimraf from 'rimraf';
import logSymbols from 'log-symbols';
// @ts-ignore
import download from 'download-git-repo';
import { getUrl } from './chunk';
import { PlatformType } from './types';

export async function createCommand(projectName: string, platform: PlatformType, lite = false) {
	if (fs.existsSync(path.join(projectName))) {
		console.log('已存在相同目录项目');
		return;
	}

	const url = await getUrl(lite);

	console.log('当前地址:' + url);
	const spinner = ora(logSymbols.success + ' 正在下载模板中,请耐心等待').start();
  download(url, projectName, { clone: true }, (err: string) => {
    if (err) {
      spinner.fail();
      console.log(logSymbols.error, chalk.red('下载失败,失败原因', err));
      rimraf.sync(projectName);
      return;
    }
    spinner.succeed();
    console.log(logSymbols.success, chalk.yellow('下载成功'));
  });
}
