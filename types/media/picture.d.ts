// 媒体-----图片
declare namespace wx {
  type ImageSizeType = "original" | "compressed";
  type ImageSourceType = "album" | "camera";

  interface ChoosedFile {
    /**
     * 本地文件路径
     */
    path: string;
    /**
     * 本地文件大小，单位：B
     */
    size: number;
  }

  interface ChooseImageResponse {
    /**
     * 文件的临时路径
     */
    tempFilePaths: string;

    /**
     * 图片的本地文件列表，每一项是一个 File 对象
     * @since 1.2.0
     *
     */
    tempFiles: ChoosedFile[];
  }

  /**
   * @deprecated use ChooseImageResponse instead
   */
  type TempFilesData = ChooseImageResponse;

  interface ChooseImageOptions extends BaseOptions {
    /**
     * 最多可以选择的图片张数，默认 9
     * @default 9
     */
    count?: number;

    /**
     * original 原图，compressed 压缩图，默认二者都有
     */
    sizeType?: ImageSizeType[];

    /**
     * album 从相册选图，camera 使用相机，默认二者都有
     */
    sourceType?: ImageSourceType[];

    /**
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    success?(res: ChooseImageResponse): void;
  }

  /**
   * 从本地相册选择图片或使用相机拍照。
   *
   * **注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 `wx.saveFile`，在小程序下次启动时才能访问得到。**
   */
  function chooseImage(options: ChooseImageOptions): void;

  interface PreviewImageOptions extends BaseOptions {
    /**
     * 当前显示图片的链接，不填则默认为 urls 的第一张
     */
    current?: string;

    /**
     * 需要预览的图片链接列表
     */
    urls: string[];
  }
  /**
   * 预览图片。
   */
  function previewImage(options: PreviewImageOptions): void;

  interface GetImageInfoResponse extends BaseResponse {
    /**
     *  图片宽度，单位px
     */
    width: number;

    /**
     *  图片高度，单位px
     */
    height: number;

    /**
     *  返回图片的本地路径
     */
    path: string;

    /**
     * @since 1.9.90
     * 
     
|枚举值	| 说明 |
| :--- | ---: |
up	| 默认
down |	180度旋转
left | 逆时针旋转90度
right	| 顺时针旋转90度
up-mirrored |	同up，但水平翻转
down-mirrored |	同down，但水平翻转
left-mirrored	| 同left，但垂直翻转
right-mirrored | 同right，但垂直翻

     */
    orientation:
      | "up"
      | "down"
      | "left"
      | "right"
      | "up-mirrored"
      | "down-mirrored"
      | "left-mirrored"
      | "right-mirrored";
  }

  interface GetImageInfoOptions extends BaseOptions {
    /**
     * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
     */
    src: string;

    success?(ret: GetImageInfoResponse): void;
  }

  /**
   * 获取图片信息
   */
  function getImageInfo(options: GetImageInfoOptions): void;

  interface SaveImageToPhotosAlbumOptions extends BaseOptions {
    /**
     * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
     */
    filePath: string;

    success?(res: BaseResponse): void;
  }

  /**
   * @deprecated
   */
  type SaveImageToPhotosAlbumOption = SaveImageToPhotosAlbumOptions;

  /**
   * 保存图片到系统相册。需要用户授权 `scope.writePhotosAlbum`
   * @since 1.2.0
   */
  function saveImageToPhotosAlbum(
    options?: SaveImageToPhotosAlbumOptions
  ): void;
}
