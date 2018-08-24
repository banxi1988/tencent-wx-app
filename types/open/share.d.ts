// 开放接口-----转发
declare namespace wx {
  interface ShareMenuOptions extends BaseOptions {
    /**
     * 是否使用带 shareTicket 的转发 [详情](https://developers.weixin.qq.com/miniprogram/dev/api/share.html#%E8%8E%B7%E5%8F%96%E6%9B%B4%E5%A4%9A%E8%BD%AC%E5%8F%91%E4%BF%A1%E6%81%AF)
     *
     */
    withShareTicket?: boolean;
  }
  /**
   * 显示当前页面的转发按钮
   *  @example
```js
  wx.showShareMenu({
  withShareTicket: true
})
  ```
   */
  function showShareMenu(options?: ShareMenuOptions): void;
  /**
   * 隐藏转发按钮
   */
  function hideShareMenu(options?: BaseOptions): void;

  /**
   * 更新转发属性
   */
  function updateShareMenu(options?: ShareMenuOptions): void;

  interface ShareInfoResponse extends BaseResponse {
    /**
     * 包括敏感数据在内的完整转发信息的加密数据，详细见加密数据解密算法
     * encryptedData 解密后为一个 JSON 结构，包含字段如下：
     * openGId	群对当前小程序的唯一 ID
     */
    encryptedData: string;
    /**
     * 加密算法的初始向量，详细见加密数据解密算法
     */
    iv: string;
  }

  interface ShareInfoOptions extends BaseOptions {
    /**
     * shareTicket
     */
    shareTicket: string;
    success?(res: ShareInfoResponse): void;
  }
  /**
   * 获取转发详细信息
   * Tip: 如需要展示群名称，可以使用开放数据组件
   * 通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识。现在通过
   * 调用 wx.showShareMenu 并且设置 withShareTicket 为 true ，当用户将小程序转发到任
   * 一群聊之后，此转发卡片在群聊中被其他用户打开时，可以在 App.onLaunch() 或 App.onShow 
   * 获取到一个 shareTicket。通过调用 wx.getShareInfo() 接口传入此 shareTicket 可以获取到转发信息。
   */
  function getShareInfo(options?: ShareInfoOptions): void;
}
