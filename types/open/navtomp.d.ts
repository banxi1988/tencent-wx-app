// 开放接口-----打开小程序
declare namespace wx {
  interface NavigateToMiniProgramOptions extends BaseOptions {
    /**
     * 要打开的小程序 appId
     */
    appId: string;
    /**
     * 打开的页面路径，如果为空则打开首页
     */
    path: string;
    /**
     * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
     */
    extraData: any;
    /**
     * 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
     */
    envVersion?: "release" | "develop" | "trial";
    success?(res: BaseResponse): void;
  }

  /**
   * 打开同一公众号下关联的另一个小程序（注：必须是同一公众号下，而非同个 open 账号下）。要求在用户发生过至少一次 touch 事件后才能调用。
   * @since 2.2.0
   */
  function navigateToMiniProgram(options: NavigateToMiniProgramOptions): void;

  interface NavigateBackMiniProgramOptions extends BaseOptions {
    extraData?: any; // 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow() 中获取到这份数据。详情
    success?(res: BaseResponse): void;
  }
  /**
   * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
   */
  function navigateBackMiniProgram(
    options: NavigateBackMiniProgramOptions
  ): void;
}
