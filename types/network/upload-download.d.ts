
// 上传下载
declare namespace wx {
    interface UploadFileResponse {
        data: string;		// 开发者服务器返回的数据
        statusCode: number;	// 开发者服务器返回的 HTTP 状态码
    }
    interface UploadFileOptions extends BaseOptions {
        /** 开发者服务器 url */
        url: string;
        /** 要上传文件资源的路径 */
        filePath: string;
        /** 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 */
        name: string;
        /** HTTP 请求 Header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** HTTP 请求中其他额外的 form data */
        formData?: any;
        success?(res: UploadFileResponse): void;
    }

    interface UploadProgressUpdate {
        progress: number;	// 上传进度百分比
        totalBytesSent: number;	// 已经上传的数据长度，单位 Bytes
        totalBytesExpectedToSend: number;	// 预期需要上传的数据总长度，单位 Bytes
    }

    interface UploadTask {
        onProgressUpdate(update: UploadProgressUpdate): void;	// 监听上传进度变化	1.4.0
        abort(): void;	//		中断上传任务	1.4.0
    }
	/**
	 * 将本地资源上传到开发者服务器。
	 * 如页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后，
	 * 可通过此接口将本地资源上传到指定服务器。
	 * 客户端发起一个 HTTPS POST 请求，
	 * 其中 Content-Type 为 multipart/form-data 。
	 */
    function uploadFile(options: UploadFileOptions): UploadTask;

    interface DownloadFileResponse {
        tempFilePath: string;	// 临时文件路径，下载后的文件会存储到一个临时文件
        statusCode: number;		// 开发者服务器返回的 HTTP 状态码
    }

    interface DownloadFileOptions extends BaseOptions {
        /** 下载资源的 url */
        url: string;
        /** HTTP 请求 Header，header 中不能设置 Referer */
        header?: RequestHeader;
        /** 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'} */
        success?(res: DownloadFileResponse): void;
    }
	/**
	 * 下载文件资源到本地。客户端直接发起一个 HTTP GET 请求，
	 * 把下载到的资源根据 type 进行处理，并返回文件的本地临时路径。
	 */
    function downloadFile(options: DownloadFileOptions): void;
}
