declare namespace wx {
  interface SetBackgroundColorOptions {
    /**
     * 窗口的背景色
     */
    backgroundColor: HexColor;

    /**
     * 顶部窗口的背景色，仅 iOS 支持
     */
    backgroundColorTop: HexColor;

    /**
     * 顶部窗口的背景色，仅 iOS 支持
     */
    backgroundColorBottom: HexColor;
  }

  /**
   * 动态设置窗口的背景色
   * @param options SetBackgroundColorOptions
   * @since 2.1.0
   */
  function setBackgroundColor(options: SetBackgroundColorOptions): void;

  interface SetBackgroundTextStyleOptions {
    /**
     * 下拉背景字体、loading 图的样式，仅支持 'dark', 'light'
     */
    textStyle: "dark" | "light";
  }

  /**
   * 动态设置下拉背景字体、loading 图的样式
   *
   * @param options SetBackgroundTextStyleOptions
   * @since 2.1.0
   */
  function setBackgroundTextStyle(options: SetBackgroundTextStyleOptions): void;
}
