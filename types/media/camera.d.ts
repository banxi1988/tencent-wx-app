// 媒体-----相机组件控制
declare namespace wx {
  type CameraDevice = "front" | "back";
  interface TakePhotoResponse {
    tempImagePath: string;
  }
  interface TakePhotoOptions extends BaseOptions {
    /**
     *  成像质量，值为high, normal, low，默认normal
     */
    quality?: "high" | "normal" | "low";
    success?(res: TakePhotoResponse): void;
  }

  interface BaseRecordResponse {
    tempThumbPath: string;
    tempVideoPath: string;
  }
  interface StopRecordResponse extends BaseRecordResponse {}
  interface StartRecordResponse extends BaseRecordResponse {}

  interface StartRecordOptions extends BaseOptions {
    /**
     *  超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
     */
    timeoutCallback?(res: StartRecordResponse): void;
  }

  interface StopRecordOptions extends BaseOptions {
    success?(res: StopRecordResponse): void;
  }
  interface CameraContext {
    /**
     *
     *  拍照，可指定质量，成功则返回图片
     */
    takePhoto(options: TakePhotoOptions): void;
    /**
     *  开始录像
     */
    startRecord(options: StartRecordOptions): void;
    /**
     *  结束录像，成功则返回封面与视频
     */
    stopRecord(options: StopRecordOptions): void;
  }
  
  /**
   * 创建并返回 `camera` 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件
   * 绑定，一个页面只能有一个 `camera`，通过它可以操作对应的 `<camera/>` 组件。 在自定义组件下，
   * 第一个参数传入组件实例this，以操作组件内 `<camera/>` 组件
   * @since 1.6.0
   */
  function createCameraContext(_this?: any): CameraContext;
}
