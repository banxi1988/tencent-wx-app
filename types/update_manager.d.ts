declare namespace wx {
  interface CheckForUpdateResponse {
    /**
     * 是否有新的版本
     */
    hasUpdate: boolean;
  }
  interface UpdateManager {
    /**
     * 当向微信后台请求完新版本信息，会进行回调
     * @param callback
     */
    onCheckForUpdate(callback: ((res: CheckForUpdateResponse) => void)): void;

    /**
     * 当新版本下载完成，会进行回调
     *
     * @description 当微信检查到小程序有新版本，会主动触发下载操作（无需开发者触发），当下载
     * 完成后，会通过 onUpdateReady 告知开发者。
     * @param callback
     */
    onUpdateReady(callback: (() => void)): void;

    /**
     *当新版本下载失败，会进行回调
     * @description 当微信检查到小程序有新版本，会主动触发下载操作（无需开发者触发），如果下
     * 载失败（可能是网络原因等），会通过 onUpdateFailed 告知开发者。
     * @param callback
     */
    onUpdateFailed(callback: (() => void)): void;

    /**
     * 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
     * @description 当小程序新版本已经下载时（即收到 onUpdateReady 回调），可以通过这个方
     * 法强制重启小程序并应用上最新版本。
     */
    applyUpdate(): void;
  }

  /**
   * 获取全局唯一的版本更新管理器，用于管理小程序更新。
   * 关于小程序的更新机制，可以查看 运行机制 文档。
   * @tips 
    1. 微信开发者工具上可以通过「编译模式」下的「下次编译模拟更新」开关来调试
    2. 小程序开发版/体验版没有「版本」概念，所以无法在开发版/体验版上测试更版本更新情况
   */
  function getUpdateManager(): UpdateManager;
}
