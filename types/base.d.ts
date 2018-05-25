declare namespace wx{
    interface BaseOptions {
        /** 接口调用成功的回调函数 */
        success?(res: any): void;
        /** 接口调用失败的回调函数 */
        fail?(res: any): void;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?(res: any): void;
    }
}