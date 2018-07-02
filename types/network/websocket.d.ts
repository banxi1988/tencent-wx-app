// WebSocket
declare namespace wx {
  interface ConnectSocketOptions extends BaseOptions {
    /**
     * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
     **/
    url: string;

    /**
     * 请求的数据
     **/
    data?: any;

    /**
     * HTTP Header , header 中不能设置 Referer
     **/
    header?: HttpHeader;

    /**
     * 有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     *
     * @default GET
     **/
    method?: Method;

    /**
     * 子协议数组
     */
    protocols?: string[];
  }

  interface SocketTaskSendOptions extends BaseOptions {
    /**
     * 需要发送的内容
     */
    data: string | ArrayBuffer;
  }

  interface SocketTaskCloseOptions extends BaseOptions {
    /**
     * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，
     * 默认的取值是1000 （表示正常连接关闭）
     *
     * @default 1000 表示正常连接关闭
     */
    code?: number;

    /**
     * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于 **`123`**字节的 `UTF-8` 文本
     * （不是字符）(提示: 一个汉字一般占用**`3`**个 `UTF-8`字节，英文占一个 )
     */
    reason?: string;
  }

  interface SocketTaskOnOpenResponse {
    /**
     *
     * 连接成功的 HTTP 响应 Header
     *
     * @since 2.0.0
     */
    header: HttpHeader;
  }

  /**
   * WebSocket 任务，可通过 wx.connectSocket() 接口创建返回。
   * @since 1.7.0
   */
  interface SocketTask {
    /**
     * 通过 WebSocket 连接发送数据。
     *
     * @param options SocketTaskSendOptions
     */
    send(options: SocketTaskSendOptions): void;

    /**
     *  关闭 WebSocket 连接。
     *
     * @param options SocketTaskCloseOptions
     */
    close(options: SocketTaskCloseOptions): void;

    /**
     * 监听 WebSocket 连接打开事件。
     * @param callback 回调函数
     */
    onOpen(callback: (res: SocketTaskOnOpenResponse) => void): void;

    /**
     * 监听WebSocket接受到服务器的消息事件。
     * @param callback 回调函数
     */
    onMessage(callback: (data: string | ArrayBuffer) => void): void;

    /**
     * 监听 WebSocket 连接关闭事件。
     * @param callback  回调函数
     */
    onClose(callback: () => void): void;

    /**
     * 监听 WebSocket 错误。
     * @param callback  回调函数
     */
    onError(callback: (errMsg: string) => void): void;
  }

  type SendSocketMessageOptions = SocketTaskSendOptions;
  type CloseSocketOptions = SocketTaskCloseOptions;

  /**
   * 创建一个 WebSocket 连接；
   *
   * 基础库 1.7.0 之前，一个微信小程序同时只能有一个 WebSocket 连接，
   * 如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。
   * 基础库版本 1.7.0 及以后，支持存在多个 WebSokcet 连接，
   * 每次成功调用 wx.connectSocket 会返回一个新的 SocketTask。
   */
  function connectSocket(options: ConnectSocketOptions): SocketTask;

  /**
   * 监听WebSocket连接打开事件。
   */
  function onSocketOpen(callback: () => void): void;

  /**
   * 监听WebSocket错误。
   */
  function onSocketError(callback: (error: any) => void): void;

  /**
   * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，
   * 并在 wx.onSocketOpen 回调之后才能发送。
   */
  function sendSocketMessage(options: SocketTaskSendOptions): void;

  /**
   * 监听WebSocket接受到服务器的消息事件。
   */
  function onSocketMessage(callback: (res: DataResponse) => void): void;

  /**
   * 关闭WebSocket连接。
   *
   * 注意这里有时序问题，
   * 如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
   * 必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭。
   * @returns SocketTask (since 1.7.0)
   */
  function closeSocket(options: SocketTaskCloseOptions): SocketTask;

  /**
   * 监听WebSocket关闭。
   */
  function onSocketClose(callback: () => void): void;
}
