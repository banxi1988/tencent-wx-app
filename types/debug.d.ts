// 调试接口
declare namespace wx {
    interface SetEnableDebugOptions extends BaseOptions {
        enableDebug: boolean;	// 是否打开调试
        success?(res: {
            errMsg: string;
        }): void;
    }
    function setEnableDebug(options: SetEnableDebugOptions): void;
}