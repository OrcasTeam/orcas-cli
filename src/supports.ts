import { FrameType, PlatformType, ScaffoldType, UIType, VersionType } from './types';

export function platforms(): Array<PlatformType> {
	return ['pc'];
	// return ['pc', 'mini'];
}

export function supportFrames(): Array<FrameType> {
	return ['vue'];
}

export function supportVersion(frame: FrameType): Array<VersionType> {
	const res = [
		frame === 'vue' && '3.X',
		frame === 'vue' && '2.X',
		frame === 'react' && '16.X',
	].filter(Boolean);
	return res as Array<VersionType>;
}

export function supportPCScaffold(version: VersionType): Array<ScaffoldType> {
	const res = ['webpack', version === '3.X' && 'vite'].filter(Boolean);

	return res as Array<ScaffoldType>;
}

export function supportUI(platform: PlatformType = 'pc'): Array<UIType> {
	const res = ['none', platform === 'pc' && 'antd'].filter(Boolean);
	return res as Array<UIType>;
}
