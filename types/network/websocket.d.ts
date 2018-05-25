// WebSocket
declare namespace wx {
    interface ConnectSocketOptions extends BaseOptions {
        /** 开发者服务器接口地址，必须是 HTTPS 协议，且域名必须是后台配置的合法域名 */
        url: string;
        /** 请求的数据 */
        data?: any;
        /** HTTP Header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** 默认是GET */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
        protocols?: string[];	// 子协议数组
    }
	/**
	 * 创建一个 WebSocket 连接；
	 * 一个微信小程序同时只能有一个 WebSocket 连接，
	 * 如果当前已存在一个 WebSocket 连接，
	 * 会自动关闭该连接，并重新创建一个 WebSocket 连接。
	 */
    function connectSocket(options: ConnectSocketOptions): void;

    /** 监听WebSocket连接打开事件。 */
    function onSocketOpen(callback: () => void): void;

    /** 监听WebSocket错误。 */
    function onSocketError(callback: (error: any) => void): void;

    interface SendSocketMessageOptions extends BaseOptions {
        /** 需要发送的内容 */
        data: string | ArrayBuffer;
    }
	/**
	 * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，
	 * 并在 wx.onSocketOpen 回调之后才能发送。
	 */
    function sendSocketMessage(options: SendSocketMessageOptions): void;

	/**
	 * 监听WebSocket接受到服务器的消息事件。
	 */
    function onSocketMessage(callback: (res: DataResponse) => void): void;

    interface CloseSocketOptions extends BaseOptions {
        code?: number;	// 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）	1.4.0
        reason?: string;	// 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
    }

	/**
	 * 关闭WebSocket连接。
	 */
    function closeSocket(options: CloseSocketOptions): void;

    /** 监听WebSocket关闭。 */
    function onSocketClose(callback: () => void): void;
}