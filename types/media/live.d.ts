/**
 * 多媒体 - 实时音视频
 */
declare namespace wx {
  interface RequestFullScreenOptions extends BaseOptions {
    /**
     * 有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
     */
    direction?: 0 | 90 | -90;
  }

  interface LivePlayerContext {
    /**
     * 播放
     * @param options BaseOptions
     */
    play(options: BaseOptions): void;
    /**
     * 停止
     * @param options BaseOptions
     */
    stop(options: BaseOptions): void;
    /**
     * 静音
     * @param options BaseOptions
     */
    mute(options: BaseOptions): void;
    /**
     * 暂停
     * @param options BaseOptions
     * @since 1.9.90
     */
    pause(options: BaseOptions): void;
    /**
     * 恢复
     * @param options BaseOptions
     * @since 1.9.90
     */
    resume(options: BaseOptions): void;
    /**
     * 进入全屏
     * @param options RequestFullScreenOptions
     */
    requestFullScreen(options: RequestFullScreenOptions): void;
    /**
     * 退出全屏
     * @param options BaseOptions
     */
    exitFullScreen(options: BaseOptions): void;
  }

  /**
   * 操作对应的 `<live-player/>` 组件。 创建并返回 `live-player` 上下文 `LivePlayerContext`
   *  对象。在自定义组件下，第二个参数传入组件实例 `this`，以操作组件内 `<live-player/>` 组件
   * @param domId
   * @param componentInstance
   */
  function createLivePlayerContext(
    domId: string,
    componentInstance?: any
  ): LivePlayerContext;

  interface LivePushContext {
    /**
     * 播放推流
     * @param options BaseOptions
     */
    start(options: BaseOptions): void;
    /**
     * 停止推流
     * @param options BaseOptions
     */
    stop(options: BaseOptions): void;
    /**
     * 暂停推流
     * @param options BaseOptions
     */
    pause(options: BaseOptions): void;
    /**
     * 恢复推流
     * @param options BaseOptions
     */
    resume(options: BaseOptions): void;
    /**
     * 切换前后摄像头
     */
    switchCamera(options: BaseOptions): void;
    /**
     * 快照
     * @since 1.9.90
     */
    snapshot(options: BaseOptions): void;
    /**
     * 切换闪光灯
     * @since 2.1.0
     */
    toggleTorch(options: BaseOptions): void;
  }

  /**
   * 创建并返回 `live-pusher` 上下文 `LivePusherContext` 对象，`LivePusherContext` 与页面的
   * `<live-pusher />` 组件绑定，一个页面只能有一个 `live-pusher`，通过它可以操作对应的
   * `<live-pusher/>` 组件。 在自定义组件下，第一个参数传入组件实例 `this`，以操作组件内
   *  `<live-pusher/>` 组件
   * @since 1.7.0
   */
  function createLivePusherContext(): LivePushContext;
}
