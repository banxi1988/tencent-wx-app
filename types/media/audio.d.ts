// 媒体-----背景音乐播放管理
 declare namespace wx {
    interface BackgroundAudioManager {
        readonly duration: number;	// 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
        readonly currentTime: number;	// 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
        readonly paused: boolean;	// 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
        src: string;	// 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav
        startTime: number;	// 音频开始播放的位置（单位：s）
        readonly buffered: number;	// 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
        title: string;	// 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
        epname: string;	// 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
        singer: string;	// 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
        coverImgUrl: string;	// 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
        webUrl: string;	// 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
    }
	/**
	 * @see [errcode 说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getBackgroundAudioManager.html)
	 */
    interface BackgroundAudioManager {
        play(): void;	// 播放
        pause(): void;	// 暂停
        stop(): void;	// 停止
        seek(position: number): void;	// 跳转到指定位置，单位 s
        onCanplay(callback: (errCode: number) => void): void;	// 背景音频进入可以播放状态，但不保证后面可以流畅播放
        onPlay(callback: (errCode: number) => void): void;	// 背景音频播放事件
        onPause(callback: (errCode: number) => void): void;	// 背景音频暂停事件
        onStop(callback: (errCode: number) => void): void;	// 背景音频停止事件
        onEnded(callback: (errCode: number) => void): void;	// 背景音频自然播放结束事件
        onTimeUpdate(callback: (errCode: number) => void): void;	// 背景音频播放进度更新事件
        onPrev(callback: (errCode: number) => void): void;	// 用户在系统音乐播放面板点击上一曲事件（iOS only）
        onNext(callback: (errCode: number) => void): void;	// 用户在系统音乐播放面板点击下一曲事件（iOS only）
        onError(callback: (errCode: number) => void): void;	// 背景音频播放错误事件
        onWaiting(callback: (errCode: number) => void): void;	// 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
    }
    /** 获取全局唯一的背景音频管理器 backgroundAudioManager。 */
    function getBackgroundAudioManager(): BackgroundAudioManager;
}

// 媒体-----音频组件控制
 declare namespace wx {
    interface InnerAudioContext {
        src: string;	// 音频的数据链接，用于直接播放。
        startTime: number;	// 开始播放的位置（单位：s），默认 0
        autoplay: boolean;	// 是否自动开始播放，默认 false
        loop: boolean;	//	是否循环播放，默认 false
        obeyMuteSwitch: boolean;	//	是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
        readonly duration: number;	// 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
        readonly currentTime: number;	// 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
        readonly paused: boolean;	// 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
        readonly buffered: number;	// 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
    }

	/**
	 * @see [errCode 说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/createInnerAudioContext.html)
	 */
    interface InnerAudioContext {
        play(): void;	// 播放
        pause(): void;	// 暂停
        stop(): void;	// 停止
        seek(position: number): void;	// 跳转到指定位置，单位 s
        destroy(): void;	// 销毁当前实例
        onCanplay(callback: (errCode: number) => void): void;	// 音频进入可以播放状态，但不保证后面可以流畅播放
        onPlay(callback: (errCode: number) => void): void;	// 音频播放事件
        onPause(callback: (errCode: number) => void): void;	// 音频暂停事件
        onStop(callback: (errCode: number) => void): void;	// 音频停止事件
        onEnded(callback: (errCode: number) => void): void;	// 音频自然播放结束事件
        onTimeUpdate(callback: (errCode: number) => void): void;	// 音频播放进度更新事件
        onError(callback: (errCode: number) => void): void;	// 音频播放错误事件
        onWaiting(callback: (errCode: number) => void): void;	// 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
        onSeeking(callback: (errCode: number) => void): void;	// 音频进行 seek 操作事件
        onSeeked(callback: (errCode: number) => void): void;	// 音频完成 seek 操作事件
    }
    function createInnerAudioContext(): InnerAudioContext;
}
