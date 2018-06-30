declare namespace wx {
  /**
   * 16 进制颜色类型 如 "#000000" 表示黑色。
   */
  type HexColor = string;

  /**
   * 单位像素
   */
  type Pixel = number;

  type PlainObject = { [key: string]: any };

  interface BaseOptions {
    /** 接口调用成功的回调函数 */
    success?(res: any): void;
    /** 接口调用失败的回调函数 */
    fail?(res: any): void;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(res: any): void;
  }

  interface BaseResponse {
    /** 调用结束 */
    errMsg: string;
  }

  interface DataResponse {
    /** 回调函数返回的内容 */
    data: any;
  }

  interface ErrMsgResponse {
    /** 成功：ok，错误：详细信息 */
    errMsg: "ok" | string;
  }
}
