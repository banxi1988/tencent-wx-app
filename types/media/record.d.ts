// 媒体-----录音管理
declare namespace wx {
    interface RecordManager {
        start(options: {
            duration?: number;	// 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
            sampleRate?: 8000 | 11025 | 12000 | 16000 | 22050 | 24000 | 32000 | 44100 | 48000;	// 采样率，有效值 8000/16000/44100
            numberOfChannels?: number;	// 录音通道数，有效值 1/2
            encodeBitRate?: number;	// 编码码率，有效值见下表格
            format?: 'aac' | 'mp3';	//	音频格式，有效值 aac/mp3
            frameSize?: number;	// 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
        }): void;	// 开始录音
        pause(): void;	// 暂停录音
        resume(): void;	// 继续录音
        stop(): void;	// 停止录音
        onStart(callback: () => void): void;	// 录音开始事件
        onPause(callback: () => void): void;	// 录音暂停事件
        onStop(callback: (data: {
            tempFilePath: string;	// 录音文件的临时路径
        }) => void): void;	// 录音停止事件，会回调文件地址
        onFrameRecorded(callback: (data: {
            frameBuffer: ArrayBuffer;	// 录音分片结果数据
            isLastFrame: boolean;	// 当前帧是否正常录音结束前的最后一帧
        }) => void): void;	// 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
        onError(callback: (errMsg: string) => void): void;	// 录音错误事件, 会回调错误信息
    }

    /** 获取全局唯一的录音管理器 recorderManager。 */
    function getRecorderManager(): RecordManager;
}
