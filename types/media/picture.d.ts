// 媒体-----图片
declare namespace wx {
    type ImageSizeType = 'original' | 'compressed';
    type ImageSourceType = 'album' | 'camera';
    type VideoSourceType = 'album' | 'camera';
    type CameraDevice = 'front' | 'back';

    interface TempFilesData {
        /** 文件的临时路径 */
        tempFilePaths: string;
        tempFiles: File[];	// 图片的本地文件列表，每一项是一个 File 对象	1.2.0
    }
    interface ChooseImageOptions extends BaseOptions {
        /** 最多可以选择的图片张数，默认9 */
        count?: number;
        /** original 原图，compressed 压缩图，默认二者都有 */
        sizeType?: ImageSizeType[];
        /** album 从相册选图，camera 使用相机，默认二者都有 */
        sourceType?: ImageSourceType[];
        /** 成功则返回图片的本地文件路径列表 tempFilePaths */
        success(res: TempFilesData): void;
    }
	/**
	 * 从本地相册选择图片或使用相机拍照。
	 */
    function chooseImage(options: ChooseImageOptions): void;

    interface PreviewImageOptions extends BaseOptions {
        /** 当前显示图片的链接，不填则默认为 urls 的第一张 */
        current?: string;
        /** 需要预览的图片链接列表 */
        urls: string[];
    }
	/**
	 * 预览图片。
	 */
    function previewImage(options: PreviewImageOptions): void;

    interface GetImageInfoOptions extends BaseOptions {
		/**
		 * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
		 */
        src: string;
        success?(ret: {
            width: number;	// 图片宽度，单位px
            height: number;	// 图片高度，单位px
            path: string;	// 返回图片的本地路径
        }): void;
    }

	/**
	 * 获取图片信息
	 */
    function getImageInfo(options: GetImageInfoOptions): void;

    interface SaveImageToPhotosAlbumOption extends BaseOptions {
        filePath: string;	// 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
        success?(errMsg: string): void;	// 接口调用成功的回调函数
    }

    /** 保存图片到系统相册。需要用户授权 scope.writePhotosAlbum */
    function saveImageToPhotosAlbum(options?: SaveImageToPhotosAlbumOption): void;
}
