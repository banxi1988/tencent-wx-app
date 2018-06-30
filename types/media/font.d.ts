declare namespace wx {
  interface FontFaceDesc {
    /**
     * 定义字体的样式，默认是"normal"
     */
    style: "normal" | "italic" | "oblique";

    /**
     * 定义字体的粗细，默认是"normal"
     */
    weight:
      | "normal"
      | "bold"
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900;

    /**
     * 设置小型大写字母的字体显示文本，默认是"normal "
     */
    variant: "normal" | "small-caps" | "inherit";
  }
  interface LoadFontFaceOptions extends BaseOptions {
    /**
     * 定义的字体名称
     */
    family: string;

    /**
     * 字体资源的地址
     */
    source: string;

    /**
     * 可选的字体描述符
     */
    desc?: string;
  }

  /**
   *  动态加载网络字体
   *
   * @param options LoadFontFaceOptions
   * @since 2.1.0
   * @description 引入的外部字体资源，建议格式为TTF和WOFF，WOFF2在低版本的IOS上会不兼容。
   */
  function loadFontFace(options: LoadFontFaceOptions): void;
}
