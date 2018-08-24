// 开放接口-----微信运动
declare namespace wx {
  interface StepInfo {
    /**
     *  时间戳，表示数据对应的时间
     */
    timestamp: number;
    /**
     *  微信运动步数
     */
    step: number;
  }
  /**
   * encryptedData 解密后为以下 json 结构
   *  详见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)
   */
  interface EncryptedData {
    stepInfoList: StepInfo[];
  }

  interface GetWeRunDataResponse extends BaseResponse {
    /**
     *  包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)
     */
    encryptedData: string;
    /**
     *  加密算法的初始向量，详细见 [加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)
     */
    iv: string;
  }
  interface GetWeRunDataOption extends BaseOptions {
    success?(res: GetWeRunDataResponse): void;
  }
  /**
   * 获取用户过去三十天微信运动步数，需要先调用 `wx.login` 接口。
   * 需要用户授权 `scope.werun`
   */
  function getWeRunData(options: GetWeRunDataOption): void;
}
