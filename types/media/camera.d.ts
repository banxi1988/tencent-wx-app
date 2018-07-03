// 媒体-----相机组件控制
declare namespace wx {
  type CameraDevice = "front" | "back";
  interface TakePhotoResponse {
    tempImagePath: string;
  }
  interface TakePhotoOptions extends BaseOptions {
    quality?: "high" | "normal" | "low"; // 成像质量，值为high, normal, low，默认normal
    success?(res: TakePhotoResponse): void;
  }

  interface StartRecordOptions extends BaseOptions {
    timeoutCallback?(res: {
      tempThumbPath: string;
      tempVideoPath: string;
    }): void; // 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
  }

  interface StopRecordResponse {
    tempThumbPath: string;
    tempVideoPath: string;
  }
  interface StopRecordOptions extends BaseOptions {
    success?(res: StopRecordResponse): void;
  }
  interface CameraContext {
    takePhoto(options: TakePhotoOptions): void; // 拍照，可指定质量，成功则返回图片
    startRecord(options: StartRecordOptions): void; // 开始录像
    stopRecord(options: StopRecordOptions): void; // 结束录像，成功则返回封面与视频
  }
  /**
   * 创建并返回 camera 上下文 cameraContext 对象，cameraContext 与页面的 camera 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 <camera/> 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 <camera/> 组件
   */
  function createCameraContext(_this?: any): CameraContext;
}
