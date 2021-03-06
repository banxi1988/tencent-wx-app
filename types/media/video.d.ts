// 媒体-----视频
declare namespace wx {
  type VideoSourceType = "album" | "camera";

  interface VideoData {
    /**
     *选定视频的临时文件路径

     * **注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 wx.saveFile，在小程序下次启动时才能访问得到。**
     */
    tempFilePath: string;
    /**
     *选定视频的时间长度
     */
    duration: number;
    /**
     *选定视频的数据量大小
     */
    size: number;
    /**
     *返回选定视频的长
     */
    height: number;
    /**
     *返回选定视频的宽
     */
    width: number;
  }

  type ChooseVideoResponse = VideoData;
  interface ChooseVideoOptions extends BaseOptions {
    /**
     * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
     */
    sourceType?: VideoSourceType[];

    /**
     * 是否压缩所选的视频源文件，默认值为true，需要压缩
     * @default true
     */
    compressed?: boolean;

    /**
     * 拍摄视频最长拍摄时间，单位秒。最长支持60秒
     */
    maxDuration?: number;

    /**
     * 前置或者后置 摄像头，默认为前后都有，即： ['front', 'back']
     * @default ['front', 'back']
     */
    camera?: CameraDevice;

    /**
     * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
     */
    success?(res: ChooseVideoResponse): void;
  }
  /**
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   */
  function chooseVideo(options: ChooseVideoOptions): void;

  interface SaveVideoOptions extends BaseOptions {
    /**
     * 视频文件路径，可以是临时文件路径也可以是永久文件路径
     */
    filePath: string;
    success?(res: BaseResponse): void;
  }

  /**
   * 保存视频到系统相册。需要用户授权 scope.writePhotosAlbum
   */
  function saveVideoToPhotosAlbum(options: SaveVideoOptions): void;
}

// 媒体-----视频组件控制
declare namespace wx {
  interface Danmu {
    text: string;
    color: number | string;
  }

  const enum Direction {
    up = 0,
    down = 90,
    downMirrored = -90
  }

  interface RequestFullScreenOptions {
    /**
     * 设置全屏时视频的方向，不指定则根据宽高比自动判断。
     * 有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
     * @since 1.7.0
     */

    direction: Direction;
  }
  interface VideoContext {
    /**
     * 播放
     */
    play(): void;

    /**
     * 暂停
     */
    pause(): void;
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void;

    /**
     * 发送弹幕，danmu 包含两个属性 text, color。
     * @since 1.4.0
     */
    sendDanmu(danmu: Danmu): void;

    /**
     * 设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5
     * @since 1.4.0
     */
    playbackRate(rate: 0.5 | 0.8 | 1.0 | 1.25 | 1.5): void;

    /**
     * 进入全屏
     * @since 1.4.0
     */
    requestFullScreen(options?: RequestFullScreenOptions): void;

    /**
     * 退出全屏
     * @since 1.4.0
     */
    exitFullScreen(): void;

    /**
     *
     * 显示状态栏，仅在iOS全屏下有效
     * @since 2.1.0
     */
    showStatusBar(): void;

    /**
     * 隐藏状态栏，仅在iOS全屏下有效
     * @since 2.1.0
     */
    hideStatusBar(): void;
  }

  /**
   * 创建并返回 video 上下文 videoContext 对象.在自定义组件下，第二个参数传入组件实例this，以操作组件内 <video/> 组件
   * @param videoId video标签id <video  src="{{src}}" id="myVideo" ></video>
   */
  function createVideoContext(
    videoId: string,
    componentInstance?: any
  ): VideoContext;
}
