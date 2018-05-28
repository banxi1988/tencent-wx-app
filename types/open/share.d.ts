// 开放接口-----转发
declare namespace wx {
  interface ShareMenuOptions extends BaseOptions {
    withShareTicket?: boolean;
  }
  /**
   * 显示分享按钮
   *
   * @param {ShowShareMenuOptions} [options]
   */
  function showShareMenu(options?: ShareMenuOptions): void;
  /**
   * 隐藏分享按钮
   *
   * @param {ShareMenuOptions} [options]
   */
  function hideShareMenu(options?: BaseOptions): void;

  /**
   * 更新转发属性
   */
  function updateShareMenu(options?: ShareMenuOptions): void;

  interface ShareInfoResponse extends BaseResponse {
    encryptedData: string; // 包括敏感数据在内的完整转发信息的加密数据，详细见加密数据解密算法
    iv: string; // 加密算法的初始向量，详细见加密数据解密算法
  }

  interface ShareInfoOptions extends BaseOptions {
    shareTicket: string;
    success?(res: ShareInfoResponse): void;
  }
  /**
   * 获取转发详细信息
   */
  function getShareInfo(options?: ShareInfoOptions): void;
}
