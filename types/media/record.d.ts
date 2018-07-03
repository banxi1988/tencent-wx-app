// 媒体-----录音管理
declare namespace wx {
  /**
   * 采样率
   */
  type SampleRate =
    | 8000
    | 11025
    | 12000
    | 16000
    | 22050
    | 24000
    | 32000
    | 44100
    | 48000;

  /**
   * 音频输入源
   */
  type AudioSource = "auto" | "buildInMic" | "headsetMic" | "mic" | "camcorder";
  
  interface RecordManagerStartOptions {
    /**
     * 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration
     * 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
     * @default 60000 (1分钟)
     */
    duration?: number;

    /**
     *  采样率，有效值 8000/16000/44100
     */
    sampleRate?: SampleRate;

    /**
     * 录音通道数，有效值 1/2
     */
    numberOfChannels?: 1 | 2;

    /**
     * 编码码率，有效值见下表格
     * 其中，采样率和码率有一定要求，具体有效值如下：

采样率  |	编码码率
--- | ---
8000   |  16000 ~ 48000
11025	|  16000 ~ 48000
12000	|  24000 ~ 64000
16000	|  24000 ~ 96000
22050	|  32000 ~ 128000
24000	|  32000 ~ 128000
32000	|  48000 ~ 192000
44100	|  64000 ~ 320000
48000	|  64000 ~ 320000
     */
    encodeBitRate?: number;

    /**
     * 音频格式，有效值 aac/mp3
     */
    format?: "aac" | "mp3";

    /**
     * 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，
     * 不指定则不会回调。暂仅支持 mp3 格式。
     */
    frameSize?: number;

    /**
     * 指定音频输入源，默认值为 'auto'
     * 
     * @default auto
     * @since 2.1.0
     * 
     * audioSource 有效值：

值 |	说明  |	支持平台
--- | --- | ---
auto	| 自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风	| iOS/Android/devtools
buildInMic |	手机麦克风	| iOS
headsetMic	| 耳机麦克风	| iOS
mic	| 麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风	| Android
camcorder |	摄像头的麦克风	| Android
     */
    audioSource: AudioSource;
  }

  interface RecordManagerOnStopResponse {
    /**
     * 录音文件的临时路径
     */
    tempFilePath: string;
  }

  interface RecordManagerOnFrameRecordedResponse {
    /**
     * 录音分片结果数据
     */
    frameBuffer: ArrayBuffer;

    /**
     * 当前帧是否正常录音结束前的最后一帧
     */
    isLastFrame: boolean;
  }

  interface RecordManager {
    /**
     * 开始录音
     * @param options RecordManagerStartOptions
     */
    start(options: RecordManagerStartOptions): void;

    /**
     * 暂停录音
     */
    pause(): void;

    /**
     * 继续录音
     */
    resume(): void;

    /**
     * 停止录音
     */
    stop(): void;

    /**
     * 录音开始事件
     * @param callback 回调函数
     */
    onStart(callback: () => void): void;

    /**
     * 录音暂停事件
     * @param callback 回调函数
     */
    onPause(callback: () => void): void;

    /**
     * 录音停止事件，会回调文件地址
     *
     * @param callback (data: RecordManagerOnStopResponse) => void
     */
    onStop(callback: (data: RecordManagerOnStopResponse) => void): void;

    /**
     * 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
     * @param callback (data: RecordManagerOnFrameRecordedResponse) => void
     */
    onFrameRecorded(
      callback: (data: RecordManagerOnFrameRecordedResponse) => void
    ): void;

    /**
     * 录音错误事件, 会回调错误信息
     * @param callback  回调函数
     */
    onError(callback: BaseResponse): void;
  }

  /**
   *
   * 获取全局唯一的录音管理器 recorderManager。
   * @since 1.6.0
   * @example
   * 
```js
const recorderManager = wx.getRecorderManager()

recorderManager.onStart(() => {
  console.log('recorder start')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  console.log('recorder stop', res)
  const { tempFilePath } = res
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

const options = {
  duration: 10000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}

recorderManager.start(options)
```
   */
  function getRecorderManager(): RecordManager;
}
