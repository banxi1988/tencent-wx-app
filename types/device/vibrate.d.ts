declare namespace wx {
  /**
   * 使手机发生较长时间的振动（400ms）
   * @since 1.2.0
   */
  function vibrateLong(options: BaseOptions): void;

  /**
   * 使手机发生较短时间的振动（200ms）
   * @since 1.2.0
   * @note vibrateShort 接口仅在 iPhone7/iPhone7Plus 及 Android 机型生效
   */
  function vibrateShort(options: BaseOptions): void;
}
