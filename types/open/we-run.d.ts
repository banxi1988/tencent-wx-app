// 开放接口-----微信运动
declare namespace wx {
    interface EncryptedData {
        stepInfoList: {
            timestamp: number;	// 时间戳，表示数据对应的时间
            step: number;	// 微信运动步数
        }[];
    }
    interface GetWeRunDataOption extends BaseOptions {
        success?(res: {
            errMsg: string;	// 调用结果
            encryptedData: string;	// 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
            iv: string;	// 加密算法的初始向量，详细见加密数据解密算法
        }): void;
    }
	/**
	 * 获取用户过去三十天微信运动步数，需要先调用 wx.login 接口。
	 */
    function getWeRunData(options: GetWeRunDataOption): void;
}