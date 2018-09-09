// 发起请求
declare namespace wx {
  /**
   * HTTP 请求方法
   */
  type Method =
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";
  type RequestDataType = object | string | ArrayBuffer;
  type DataType = string | "json";
  type ResponseType = "text" | "arraybuffer";
  type ResponseDataType = object | string | ArrayBuffer;

  interface Response {
    /**
     * 开发者服务器返回的数据
     */
    data: ResponseDataType;

    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;

    /**
     * 开发者服务器返回的 HTTP Response Header
     *
     * @since 1.2.0
     */
    header: HttpHeader;
  }

  export type RequestResponse = Response;

  interface HttpHeader {
    [key: string]: string;
  }

  type RequestHeader = HttpHeader;

  interface RequestTask {
    /**
     * 中断请求任务
     */
    abort(): void;
  }

  /**
   * 纯请求对象， 可以用来作为封装 Promise 返回类型的参数对象。
   */
  interface Request {
    /**
     * 开发者服务器接口地址
     */
    url: string;

    /**
     * 请求的参数
     *
     * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成
     * `String` 。转换规则如下：
     * - 对于 `GET` 方法的数据，会将数据转换成 query string
     * （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
     * - 对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，
     * 会对数据进行 JSON 序列化
     * - 对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded`
     *  的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
     *
     * Tips:
     * 1. `content-type` 默认为 `application/json`;
     */
    data?: RequestDataType;

    /**
     * 设置请求的 header，header 中不能设置 Referer。
     */
    header?: HttpHeader;

    /**
     * GET	（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     * @default GET
     */
    method?: Method;

    /**
     * 如果设为json，会尝试对返回的数据做一次 JSON.parse
     * @default json
     */
    dataType?: DataType;

    /**
     * 设置响应的数据类型。合法值：text、arraybuffer
     * @since 1.7.0
     * @default text
     */
    responseType?: ResponseType;
  }

  interface RequestOptions extends Request, BaseOptions {
    /** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
    success?(res: Response): void;
  }
  /**
   * wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。
   * @return 返回一个 requestTask 对象，通过 requestTask，可中断请求任务。
   */
  function request(options: RequestOptions): RequestTask;
}
