declare namespace wx {
  interface TabBarOptions extends BaseOptions {
    /**
     * tabBar的哪一项，从左边算起
     */
    index: number;
  }
  interface SetTabBarBadgeOptions extends TabBarOptions {
    /**
     * 显示的文本，超过 3 个字符则显示成“…”
     */
    text: string;
  }

  /**
   * 为 tabBar 某一项的右上角添加文本
   * @param options  SetTabBarBadgeOptions
   * @since 1.9.0
   */
  function setTabBarBadge(options: SetTabBarBadgeOptions): void;

  /**
   * 移除 tabBar 某一项右上角的文本
   *
   * @param options TabBarBadgeOptions
   * @since 1.9.0
   */
  function removeTabBarBadge(options: TabBarOptions): void;

  /**
   * 显示 tabBar 某一项的右上角的红点
   *
   * @param options TabBarBadgeOptions
   * @since 1.9.0
   */
  function showTabBarRedDot(options: TabBarOptions): void;

  /**
   * 隐藏 tabBar 某一项的右上角的红点
   *
   * @param options TabBarBadgeOptions
   * @since 1.9.0
   */
  function hideTabBarRedDot(options: TabBarOptions): void;

  interface TabBarStyle {
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
    borderStyle: "black" | "white";
  }
  /**
   * 动态设置 tabBar 的整体样式
   *
   * @param style TabBarBadgeStyle
   * @since 1.9.0
   */
  function setTabBarStyle(style: TabBarStyle): void;

  /**
   * TabbarItem 配置
   */
  interface TabBarItem extends TabBarOptions {
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
   * 动态设置 tabBar  某一项的内容
   *
   * @param style TabBarItem
   * @since 1.9.0
   */
  function setTabBarItem(item: TabBarItem): void;

  interface ShowTabBarOptions extends BaseOptions {
    /**
     * 是否需要动画效果，默认无
     * @default false
     */
    animation?: boolean;
  }

  /**
   *  显示 TabBar
   * @param options ShowTabBarOptions
   * @since 1.9.0
   */
  function showTabBar(options: ShowTabBarOptions): void;

  /**
   * 隐藏 TabBar
   *
   * @param options ShowTabBarOptions
   * @since 1.9.0
   */
  function hideTabBar(options: ShowTabBarOptions): void;
}
