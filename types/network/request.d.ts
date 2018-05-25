// 发起请求

declare namespace wx {
    interface RequestHeader {
        [key: string]: string;
    }
    interface RequestOptions extends BaseOptions {
        /** 开发者服务器接口地址 */
        url: string;
        /** 请求的参数 */
        data?: string | any;
        /** 设置请求的 header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
        method?: string;
        dataType?: 'json';	// 如果设为json，会尝试对返回的数据做一次 JSON.parse
        /** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
        success?(res: DataResponse): void;
    }
	/**
	 * wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。
	 */
    function request(options: RequestOptions): void;
}