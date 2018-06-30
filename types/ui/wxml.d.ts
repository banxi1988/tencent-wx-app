// WXML节点信息
declare namespace wx {
  /**
   * 节点位置
   */
  interface Rect {
    id: string; // 节点的ID
    dataset: any; // 节点的dataset
    left: number; // 节点的左边界坐标
    right: number; // 节点的右边界坐标
    top: number; // 节点的上边界坐标
    bottom: number; // 节点的下边界坐标
    width: number; // 节点的宽度
    height: number; // 节点的高度
  }
  interface NodeRefScrollOffset {
    id: string; // 节点的ID
    dataset: any; // 节点的dataset
    scrollLeft: number; // 节点的水平滚动位置
    scrollTop: number; // 节点的竖直滚动位置
  }

  interface NodeRefFieldsOptions {
    /**
     * 是否返回节点id
     */
    id?: boolean;

    /**
     * 是否返回节点 `dataset`
     */
    dataset?: boolean;

    /**
     * 是否返回节点布局位置（`left` `right` `top` `bottom`）
     */
    rect?: boolean;

    /**
     * 是否返回节点尺寸（`width` `height`）
     */
    size?: boolean;

    /**
     * 是否返回节点的 `scrollLeft` `scrollTop` ，节点必须是 `scroll-view` 或者 `viewport`
     */
    scrollOffset?: boolean;

    /**
     * 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，
     *  `id` `class` `style` 和事件绑定的属性值不可获取）
     */
    properties: string[];

    /**
     * 指定样式名列表，返回节点对应样式名的当前值
     * @since 2.1.0
     */
    computedStyle: string[];
  }

  interface NodesRef {
    /**
     * 
     * 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位。其功能类似于DOM的
     * `getBoundingClientRect` 。返回值是 `nodesRef` 对应的 `selectorQuery`。
     * 返回的节点信息中，每个节点的位置用left、right、top、bottom、width、height字段描述。如果提供了callback回调函数，在执行selectQuery的exec方法后，节点信息会在callback中返回。
     * 
     *  @example
     * 
     ```
     Page({
  getRect: function(){
    wx.createSelectorQuery().select('#the-id').boundingClientRect(function(rect){

    }).exec()
  },
  getAllRects: function(){
    wx.createSelectorQuery().selectAll('.a-class').boundingClientRect(function(rects){
      rects.forEach(function(rect){
       
      })
    }).exec()
  }
})
     * ```
     */
    boundingClientRect(callback?: (rect: Rect) => void): SelectorQuery;

    /**
     * 添加节点的滚动位置查询请求，以像素为单位。节点必须是 `scroll-view` 或者 `viewport`。
     * 返回值是 `nodesRef` 对应的 `selectorQuery`。
     *
     * 返回的节点信息中，每个节点的滚动位置用 `scrollLeft`、`scrollTop` 字段描述。
     * 如果提供了 `callback` 回调函数，在执行 `selectQuery` 的 `exec` 方法后，
     * 节点信息会在 `callback`中返回。
     */
    scrollOffset(callback?: (res: NodeRefScrollOffset) => void): SelectorQuery;

    /**
     * 获取节点的相关信息，需要获取的字段在 `fields` 中指定。返回值是 `nodesRef` 对应的
     * `selectorQuery`。可指定获取的字段包括：
     *
     * @param options NodeRefFieldsOptions
     * @param callback
     *
     * > 注意： computedStyle 的优先级高于 size，当同时在 computedStyle 里指定了
     * > width/height 和传入了 size: true，则优先返回 computedStyle 获取到的 width/height。
     * 
     * @example
     ```
  wx.createSelectorQuery().select('#the-id').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY'],
      computedStyle: ['margin', 'backgroundColor']
  }, function(res){
      res.dataset    // 节点的dataset
      res.width      // 节点的宽度
      res.height     // 节点的高度
      res.scrollLeft // 节点的水平滚动位置
      res.scrollTop  // 节点的竖直滚动位置
      res.scrollX    // 节点 scroll-x 属性的当前值
      res.scrollY    // 节点 scroll-y 属性的当前值
      // 此处返回指定要返回的样式
      res.margin
      res.backgroundColor
  }).exec()
     ```
     */
    fields(
      options: NodeRefFieldsOptions,
      callback?: (res: { [property: string]: any }) => void
    ): SelectorQuery;
  }

  interface SelectorQuery {
    /**
     * 将选择器的选取范围更改为自定义组件 `component` 内。（初始时，选择器仅选取页面范围的
     * 节点，不会选取任何自定义组件中的节点。）
     *
     * @param component 自定义组件
     */
    in(component: any): SelectorQuery;

    /** 在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于获取节点信息。 */

    /**
     * 在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于
     * 获取节点信息。
     *
     * @param selector `selector` 类似于 CSS的选择器，但仅支持下列语法。
     *
     * - ID选择器：#the-id
     * - class选择器（可以连续指定多个）：.a-class.another-class
     * - 子元素选择器：.the-parent > .the-child
     * - 后代选择器：.the-ancestor .the-descendant
     * - 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
     * - 多选择器的并集：#a-node, .some-other-nodes
     */
    select(selector: string): NodesRef;

    /**
     *
     * 在当前页面下选择匹配选择器 `selector` 的节点，返回一个 `NodesRef` 对象实例。 与
     * `selectorQuery.select(selector)` 不同的是，它选择所有匹配选择器的节点。
     * @param selector 选择器，更多说明，见 `select` 方法。
     *
     */
    selectAll(selector: string): NodesRef;
    /**
     * 选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息，返回一个 `NodesRef` 对象实例。
     */
    selectViewport(): NodesRef;
    /**
     * 执行所有的请求，请求结果按请求次序构成数组，在 `callback` 的第一个参数中返回。
     *
     * @param callback
     */
    exec(callback?: (res: any[]) => void): void;
  }

  /**
   * 返回一个 `SelectorQuery` 对象实例。可以在这个实例上使用 `select` 等方法选择节点，
   * 并使用 `boundingClientRect` 等方法选择需要查询的信息。
   */
  function createSelectorQuery(): SelectorQuery;
}
