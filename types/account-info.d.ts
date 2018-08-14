declare namespace wx {
  /**
   * 小程序帐号信息
   */
  interface MiniProgram {
    /**
     * 小程序 appId
     */
    appId: string;
  }

  /**
   * 插件账号信息（仅在插件中调用时包含这一项）
   */
  interface Plugin {
    /**
     * 插件 appId
     */
    appId: string;
    /**
     * 插件版本号
     */
    version: string;
  }

  /**
   * 访问当前小程序或插件帐号信息。
   */
  interface AccountInfo {
    /**
     * 小程序帐号信息
     */
    miniProgram: MiniProgram;
    /**
     * 插件账号信息（仅在插件中调用时包含这一项）
     */
    plugin?: Plugin;
  }

  /**
   * 访问当前小程序或插件帐号信息。
   * @since 2.2.2
   * @example
```
var accountInfo = wx.getAccountInfoSync();
accountInfo.miniProgram.appId // 小程序 appId
accountInfo.plugin.appId // 插件 appId
accountInfo.plugin.version // 插件版本号， 'a.b.c' 这样的形式
```
   */
  function getAccountInfoSync(): AccountInfo;
}
