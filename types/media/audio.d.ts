// 媒体-----背景音乐播放管理
declare namespace wx {
  interface BackgroundAudioManager {
    /**
     * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     */
    readonly duration: number;

    /**
     * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
     */
    readonly currentTime: number;

    /**
     * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     */
    readonly paused: boolean;

    /**
     *  音频的数据源，默认为空字符串，**当设置了新的 src 时，会自动开始播放** ，目前支持的格式有 m4a, aac, mp3, wav
     */
    src: string;

    /**
     *  音频开始播放的位置（单位：s）
     */
    startTime: number;

    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     */
    readonly buffered: number;

    /**
     * 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
     */
    title: string;

    /**
     * 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    epname: string;

    /**
     * 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    singer: string;

    /**
     * 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
     */
    coverImgUrl: string;

    /**
     * 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    webUrl: string;

    /**
     * 音频协议。默认值为 'http'，设置 'hls' 可以支持播放 HLS 协议的直播音频
     * @default 'http'
     * @since 1.9.94
     */
    protocol: string;
  }
  /**
   * @see [errcode 说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getBackgroundAudioManager.html)
   */
  interface BackgroundAudioManager {
    /**
     *  播放
     */
    play(): void;

    /**
     *  暂停
     */
    pause(): void;

    /**
     *  停止
     */
    stop(): void;

    /**
     * @param position   跳转到指定位置，单位 s 精确到小数点后 3 位，即支持 ms 级别精确度
     */
    seek(position: number): void;

    /**
     *  背景音频进入可以播放状态，但不保证后面可以流畅播放
     * @param callback 回调函数
     */
    onCanplay(callback: () => void): void;
    /**
     *  背景音频播放事件
     * @param callback 回调函数
     */
    onPlay(callback: () => void): void;
    /**
     *  背景音频开始跳转操作事件
     * @param callback 回调函数
     * @since 2.2.3
     */
    onSeeking(callback: () => void): void;
    /**
     *  背景音频完成跳转操作事件
     * @param callback 回调函数
     * @since 2.2.3
     */
    onSeeked(callback: () => void): void;
    /**
     *  背景音频暂停事件
     * @param callback 回调函数
     */
    onPause(callback: () => void): void;
    /**
     *  背景音频停止事件
     * @param callback 回调函数
     */
    onStop(callback: () => void): void;
    /**
     *  背景音频自然播放结束事件
     * @param callback 回调函数
     */
    onEnded(callback: () => void): void;
    /**
     *  背景音频播放进度更新事件
     * @param callback 回调函数
     */
    onTimeUpdate(callback: () => void): void;
    /**
     *  用户在系统音乐播放面板点击上一曲事件（iOS only）
     * @param callback 回调函数
     */
    onPrev(callback: () => void): void;
    /**
     *  用户在系统音乐播放面板点击下一曲事件（iOS only）
     * @param callback 回调函数
     */
    onNext(callback: () => void): void;
    /**
     *  背景音频播放错误事件
     * @param callback 回调函数
     * errcode 说明
     * 
| errCode |	说明 |
| ---- | ----|
10001 | 系统错误
10002 | 网络错误
10003 | 文件错误
10004 | 格式错误
-1    | 未知错误
     */
    onError(callback: (errCode: number) => void): void;
    /**
     *  音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     * @param callback 回调函数
     */
    onWaiting(callback: () => void): void;
  }
  /**
   * 获取全局唯一的背景音频管理器 backgroundAudioManager。
   * 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态。

注：从微信客户端6.7.2版本开始，若需要在小程序切后台后继续播放音频，需要在 app.json 中配置 requiredBackgroundModes 属性。开发版和体验版上可以直接生效，正式版还需通过审核。
   * @since 1.2.0
   */
  function getBackgroundAudioManager(): BackgroundAudioManager;
}

// 媒体-----音频组件控制
declare namespace wx {
  interface InnerAudioContext {
    /**
     *  音频的数据链接，用于直接播放。
     */
    src: string;

    /**
     * 开始播放的位置（单位：s），默认 0
     *
     * @default 0
     */
    startTime: number;

    /**
     * 是否自动开始播放，默认 false
     *
     * @default false
     */
    autoplay: boolean;

    /**
     * 是否循环播放，默认 false
     *
     * @default false
     */
    loop: boolean;

    /**
     * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，
     * 默认值 true
     * @default true
     */
    obeyMuteSwitch: boolean;

    /**
     *  当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     */
    readonly duration: number;

    /**
     *  当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
     */
    readonly currentTime: number;

    /**
     *  当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     */
    readonly paused: boolean;

    /**
     *  音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     */
    readonly buffered: number;

    /**
     * 音量。范围 0~1。
     * @since 1.9.90
     */
    volume: number;
  }

  /**
   * @see [errCode 说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/createInnerAudioContext.html)
   */
  interface InnerAudioContext {
    /**
     * 播放
     */
    play(): void;

    /**
     * 暂停
     */
    pause(): void;

    /**
     * 停止
     */
    stop(): void;

    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void;

    /**
     * 销毁当前实例
     */
    destroy(): void;
    /**
     *  音频进入可以播放状态，但不保证后面可以流畅播放
     * @param callback 回调函数
     */
    onCanplay(callback: () => void): void;
    /**
     *  音频播放事件
     * @param callback 回调函数
     */
    onPlay(callback: () => void): void;
    /**
     *  音频暂停事件
     * @param callback 回调函数
     */
    onPause(callback: () => void): void;
    /**
     *  音频停止事件
     * @param callback 回调函数
     */
    onStop(callback: () => void): void;
    /**
     *  音频自然播放结束事件
     * @param callback 回调函数
     */
    onEnded(callback: () => void): void;
    /**
     *  音频播放进度更新事件
     * @param callback 回调函数
     */
    onTimeUpdate(callback: () => void): void;
    /**
     *  音频播放错误事件
     * @param callback 回调函数
     * errcode 说明
     *
| errCode |	说明 |
| ---- | ----|
10001 | 系统错误
10002 | 网络错误
10003 | 文件错误
10004 | 格式错误
-1    | 未知错误
     */
    onError(callback: () => void): void;
    /**
     *  音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     * @param callback 回调函数
     */
    onWaiting(callback: () => void): void;

    /**
     *  音频进行 seek 操作事件
     * @param callback 回调函数
     */
    onSeeking(callback: () => void): void;

    /**
     * 音频完成 seek 操作事件
     * @param callback 回调函数
     */
    onSeeked(callback: () => void): void;

    /**
     * 取消监听 onCanplay 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offCanplay(callback: () => void): void;

    /**
     * 取消监听 onPlay 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offPlay(callback: () => void): void;

    /**
     * 取消监听 onPause 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offPause(callback: () => void): void;

    /**
     * 取消监听 onStop 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offStop(callback: () => void): void;

    /**
     * 取消监听 onEnded 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offEnded(callback: () => void): void;

    /**
     * 取消监听 onTimeUpdate 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offTimeUpdate(callback: () => void): void;

    /**
     * 取消监听 onError 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offError(callback: () => void): void;

    /**
     * 取消监听 onWaiting 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offWaiting(callback: () => void): void;

    /**
     * 取消监听 onSeeking 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offSeeking(callback: () => void): void;

    /**
     * 取消监听 onSeeked 事件
     * @param callback 回调函数
     * @since 1.9.0
     */
    offSeeked(callback: () => void): void;
  }

  /**
   *
   * 创建并返回内部 audio 上下文 innerAudioContext 对象。本接口是 wx.createAudioContext 升级版。
   * @since 1.6.0
   * @example
   * 
```js
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true
innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
innerAudioContext.onPlay(() => {
    console.log('开始播放')
})
innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
})
```
   */
  function createInnerAudioContext(): InnerAudioContext;

  interface SetInnerAudioContextOptionOptions extends BaseOptions {
    /**
     * 	是否与其他音频混播，设置为 true 之后，不会终止其他应用或微信内的音乐
     * @default true
     */
    mixWithOther?: boolean;
    /**
     *
     * @note（仅在 iOS 生效）是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音
     * @default true
     */
    obeyMuteSwitch?: boolean;
  }

  /**
   * 设置 InnerAudioContext 的播放选项，设置之后对当前小程序全局生效
   * @since 2.3.0
   */
  function setInnerAudioOption(
    options: SetInnerAudioContextOptionOptions
  ): void;
}
