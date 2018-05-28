// WXML节点信息
 declare namespace wx {
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
  interface NodesRef {
    /**
     * 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位。其功能类似于DOM的getBoundingClientRect。返回值是nodesRef对应的selectorQuery。
     */
    boundingClientRect(callback?: (rect: Rect) => void): SelectorQuery;
    /**
     * 添加节点的滚动位置查询请求，以像素为单位。节点必须是scroll-view或者viewport。返回值是nodesRef对应的selectorQuery。
     */
    scrollOffset(
      callback?: (
        rect: {
          id: string; // 节点的ID
          dataset: any; // 节点的dataset
          scrollLeft: number; // 节点的水平滚动位置
          scrollTop: number; // 节点的竖直滚动位置
        }
      ) => void
    ): SelectorQuery;
    fields(
      options: {
        id?: boolean; // 是否返回节点id
        dataset?: boolean; // 是否返回节点dataset
        rect?: boolean; // 是否返回节点布局位置（left right top bottom）
        size?: boolean; // 是否返回节点尺寸（width height）
        scrollOffset?: boolean; // 是否返回节点的 scrollLeft scrollTop ，节点必须是scroll-view或者viewport
        properties?: string[]; // 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值， id class style 和事件绑定的属性值不可获取）
      },
      callback?: (res: { [property: string]: any }) => void
    ): SelectorQuery;
  }
  interface SelectorQuery {
    /** 将选择器的选取范围更改为自定义组件component内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点。） */
    in(component: any): SelectorQuery;
    /** 在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于获取节点信息。 */
    select(selector: string): NodesRef;
    /** 在当前页面下选择匹配选择器selector的节点，返回一个NodesRef对象实例。 与selectorQuery.selectNode(selector)不同的是，它选择所有匹配选择器的节点。 */
    selectAll(selector: string): NodesRef;
    /** 选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息，返回一个NodesRef对象实例。 */
    selectViewport(): SelectorQuery;
    exec(callback?: (res: any[]) => void): SelectorQuery;
  }

  /**
   * 返回一个SelectorQuery对象实例。可以在这个实例上使用select等方法选择节点，并使用boundingClientRect等方法选择需要查询的信息。
   */
  function createSelectorQuery(): SelectorQuery;
}
