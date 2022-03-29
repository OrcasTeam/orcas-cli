import { FrameType, PlatformType, ProjectType, ScaffoldType, UIType, VersionType } from './types';

export function supportPlatform(): Array<PlatformType> {
	return ['pc'];
	// return ['pc', 'mini'];
}

export function supportFrames(projectType: ProjectType): Array<FrameType> {
	return ['vue'];
}

export function supportVersion(projectType: ProjectType, frame: FrameType): Array<VersionType> {
	const res = ['3.X', projectType === 'spa' && '2.X'].filter(Boolean);
	return res as Array<VersionType>;
}

export function supportPCScaffold(projectType: ProjectType, version: VersionType): Array<ScaffoldType> {
	const res = ['webpack', version === '3.X' && projectType === 'spa' && 'vite'].filter(Boolean);

	return res as Array<ScaffoldType>;
}

export function supportUI(platform: PlatformType = 'pc'): Array<UIType> {
	const res = ['none', platform === 'pc' && 'antd'].filter(Boolean);
	return res as Array<UIType>;
}


export function supportType(): Array<ProjectType> {
  const res = ['MPA', 'SPA'].filter(Boolean);
  return res as Array<ProjectType>;
}
