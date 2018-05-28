// 开放接口-----设置
declare namespace wx {
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
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   */
  function openSetting(options: SettingOptions): void;
  /**
   * 获取用户的当前设置。
   */
  function getSetting(options: SettingOptions): void;
}
