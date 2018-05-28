namespace mp {
    /**
     * 将 微信回调风格的接口函数包装成支持 Promise 风格的函数。
     * @param fun 微信回调风格接口函数
     */
    export function promisify<P extends wx.BaseOptions, R>(
        fun: (options: P) => any
    ) {
        function newFun(options?: P): Promise<R> {
            const opts: P = options || ({} as P);
            return new Promise(function (resolve, reject) {
                opts.success = res => {
                    resolve(res);
                };
                opts.fail = () => {
                    reject();
                };
                fun(opts);
            });
        }
        return newFun;
    }

    export const login = promisify<wx.LoginOptions, wx.LoginResponse>(wx.login);
    export const getUserInfo = promisify<
        wx.GetUserInfoOptions,
        wx.UserInfoResponse
        >(wx.getUserInfo);

    export const showModal = promisify<wx.ModalOptions,wx.ModalResponse>(wx.showModal);
}
