// 开放接口-----设置
declare namespace wx {
  /**
   * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，
   * 详见 [scope 列表](https://developers.weixin.qq.com/miniprogram/dev/api/authorize-index.html#scope-%E5%88%97%E8%A1%A8)
   */
  interface AuthSetting {
    // [key: Scope]: boolean;
    "scope.userInfo": boolean;
    "scope.userLocation": boolean;
    "scope.address": boolean;
    "scope.invoiceTitle": boolean;
    "scope.werun": boolean;
    "scope.record": boolean;
    "scope.writePhotosAlbum": boolean;
  }

  interface SettingsResponse {
    authSetting: AuthSetting;
  }

  interface SettingOptions extends BaseOptions {
    success?(res: SettingsResponse): void;
  }
  /**
   * @deprecated 此接口即将废弃，请使用 <button> 组件来使用此功能
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   */
  function openSetting(options: SettingOptions): void;
  /**
   * 获取用户的当前设置。
   * @note 注：返回值中只会出现小程序已经向用户请求过的权限。
   */
  function getSetting(options: SettingOptions): void;
}
