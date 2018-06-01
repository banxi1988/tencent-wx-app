/**
 * 小程序配置接口声明
 */
declare namespace mpc {
  /**
   * 16 进制颜色类型 如 "#000000" 表示黑色。
   */
  type HexColor = string;

  /**
   * 单位像素
   */
  type Pixel = number;

  /**
   * 小程序页面配置
   * 参考 ：https://developers.weixin.qq.com/miniprogram/dev/framework/config.html
   */
  interface PageConfig {
    /**
     * 导航栏背景颜色，如"#000000"
     * @default #000000
     */
    navigationBarBackgroundColor?: HexColor;

    /**
     * 导航栏标题颜色，仅支持 black/white
     * @default white
     */
    navigationBarTextStyle?: "white" | "black";

    /**
     * 导航栏标题文字内容
     */
    navigationBarTitleText?: string;

    /**
     * 窗口的背景色
     * @default "#ffffff"
     */
    backgroundColor?: HexColor;

    /**
     * 下拉 loading 的样式，仅支持 dark/light
     * @default dark
     */
    backgroundTextStyle?: "dark" | "light";

    /**
     * 是否开启下拉刷新，详见页面相关事件处理函数。
     * @default false
     */
    enablePullDownRefresh?: boolean;

    /**
     *
     * 设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，
     * 无法在 app.json 中设置该项
     * @default false
     */
    disableScroll?: boolean;

    /**
     *
     * 页面上拉触底事件触发时距页面底部距离，单位为px
     * @default 50
     */
    onReachBottomDistance?: Pixel;
  }

  /**
   * 小程序窗口配置
   * 用于设置小程序的状态栏、导航条、标题、窗口背景色。
   */
  interface WindowConfig extends PageConfig {
    /**
     * 导航栏样式，
     * 仅支持 default/custom。custom 模式可自定义导航栏，
     * 只保留右上角胶囊状的按钮
     * @default default
     * @since Wechat 6.6.0
     */
    navigationStyle?: "default" | "custom";

    /**
     * 顶部窗口的背景色，仅 iOS 支持
     * @default #ffffff
     * @since 6.5.16
     */
    backgroundColorTop?: HexColor;

    /**
     * 顶部窗口的背景色，仅 iOS 支持
     * @default #ffffff
     * @since 6.5.16
     */
    backgroundColorBottom?: HexColor;
  }

  /**
   * 可以设置各种网络请求的超时时间。
   */
  interface NetworkTimeoutConfig {
    /**
     *
     * wx.request 的超时时间，单位毫秒，默认为：60000
     * @default 600000  = 60s
     */
    request?: number;

    /**
     *
     * wx.connectSocket 的超时时间，单位毫秒，默认为：60000
     * @default 600000  = 60s
     */
    connectSocket?: number;

    /**
     *
     * wx.uploadFile 的超时时间，单位毫秒，默认为：60000
     * @default 600000  = 60s
     */
    uploadFile?: number;

    /**
     *
     * wx.downloadFile 的超时时间，单位毫秒，默认为：60000
     * @default 600000  = 60s
     */
    downloadFile?: number;
  }

  /**
   * TabbarItem 配置
   */
  interface TabBarItem {
    /**
     * 页面路径，必须在 pages 中先定义
     */
    pagePath: string;

    /**
     * tab 上按钮文字
     */
    text: string;

    /**
     * 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，
     * 当 postion 为 top 时，此参数无效，不支持网络图片
     */
    iconPath?: string;

    /**
     * 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，
     * 当 postion 为 top 时，此参数无效，不支持网络图片
     */
    selectedIconPath?: string;
  }

  /**
   * 如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。
   * Tip：
   * 当设置 position 为 top 时，将不会显示 icon
   * tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
   */
  interface TabBarConfig {
    /**
     * tab 上的文字默认颜色
     */
    color: HexColor;

    /**
     * tab 上的文字选中时的颜色
     */
    selectedColor: HexColor;

    /**
     * tab 的背景色
     */
    backgroundColor: HexColor;

    /**
     * tabbar上边框的颜色， 仅支持 black/white
     * @default black
     */
    borderStyle?: "black" | "white";

    /**
     * tab 的列表，详见 list 属性说明，最少2个、最多5个 tab
     */
    list: Array<TabBarItem>;

    /**
     * TabBar 位置。 可选值 bottom、top
     * @default bottom
     */
    position?: "bottom" | "top";
  }

  /**
   * app.json文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。
   */
  interface AppConfig {
    /**
     * 设置页面路径
     */
    pages: Array<string>;

    /**
     * 设置默认页面的窗口表现
     */
    window?: WindowConfig;

    /**
     * 设置底部 tab 的表现
     */
    tabBar?: TabBarConfig;

    /**
     * 设置网络超时时间
     */
    networkTimeout?: NetworkTimeoutConfig;

    /**
     * 设置底部 tab 的表现
     */
    debug?: boolean;
  }
}
