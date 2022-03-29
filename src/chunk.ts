import inquirer from 'inquirer';
import { FrameType, PlatformType, ProjectType, ScaffoldType, UIType, VersionType } from './types';
import { supportFrames, supportPCScaffold, supportPlatform, supportType, supportUI, supportVersion } from './supports';

const author = require('../package.json').author;

const urlPrefix = `https://github.com:${ author?.name || author }`;

const LINE_MATCH = /\n|\r|\r\n|\s/g;


function choose<T extends string>(choices: Array<T>, message: string, lower: boolean = true): Promise<T>{
  return new Promise((resolve, reject) => {
    if(choices.length === 1){
      resolve(choices[0]);
      return;
    }
  
    const select = [{ type: 'list', message: message, name: 'name', choices, filter: (val: T) =>  lower? val.toLowerCase() : val  }];
  
    inquirer.prompt<{ name: T }>(select).then(data => {
      resolve(data.name);
    }).catch(error => {
      reject(error);
    })
  })
}

/**
 * 平台选择
 */
async function projectPlatformChoose(): Promise<PlatformType> {
  return  await choose(supportPlatform(), '请选择平台');
}

/**
 * 项目类型选择
 */
async function projectTypeChoose() {
  return  await choose(supportType(), '请选择项目类型');
}

/**
 * 框架选择
 * @param projectType
 */
async function projectFrameChoose(projectType: ProjectType) {
  return await choose(supportFrames(projectType), '请选择框架');
}

/**
 * 版本选择
 * @param projectType
 * @param frame
 */
async function projectVersionChoose(projectType: ProjectType, frame: FrameType) {
  return await choose(supportVersion(projectType, frame), '请选择版本', false);
}

/**
 * 脚手架选择
 * @param projectType
 * @param version
 */
async function projectScaffoldChoose(projectType: ProjectType, version: VersionType): Promise<ScaffoldType> {
  return await choose(supportPCScaffold(projectType, version), '请选择脚手架');
}

/**
 * UI选择
 */
async function projectUIChoose(platform: PlatformType = 'pc'): Promise<UIType> {
  return await choose(supportUI(platform), '请选择UI框架');
}


async function  getLiteUrl() {
  // const ui = await projectUIChoose();
  const url = `${ urlPrefix }/spa-template-thin#main`;
  
  return url.replace(LINE_MATCH, '');
  
}

export async function getUrl(lite = false): Promise<string> {
  
  if(lite) {
    return await getLiteUrl();
  }
  
  // const platform = await projectPlatformChoose();
  
  const projectType = await projectTypeChoose();
  
  const frame = await projectFrameChoose(projectType);
  
  const version = await projectVersionChoose(projectType, frame);
  
  const worker = await projectScaffoldChoose(projectType, version);
  
  const ui = await projectUIChoose();
  
  
  const template = `${projectType}-${frame}-template`;
  
  const url = `${ urlPrefix }/${ template }#${ worker }-${ ui !== 'none' ? ui + '-' : '' }${ version }`;
  
  return url.replace(LINE_MATCH, '');
}
