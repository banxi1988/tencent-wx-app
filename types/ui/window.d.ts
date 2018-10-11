/**
 * 显示区域指小程序界面中可以自由布局展示的区域。在默认情况下，小程序显示区域的尺寸自页面初始化起就不会发生变化。

从小程序基础库版本 2.3.0 开始，在 iPad 上运行的小程序可以支持屏幕旋转。使小程序支持 iPad 屏幕旋转的方法是：在 app.json 中添加 "resizable": true 。
如果小程序添加了上述声明，则在屏幕旋转时，小程序将随之旋转，显示区域尺寸也会随着屏幕旋转而变化。
 */
declare namespace wx {
  interface WindowSize {
    /**
     * 变化后的窗口宽度，单位 px
     */
    windowWidth: number;
    /**
     * 变化后的窗口高度，单位 px
     */
    windowHeight: number;
  }

  interface OnWindowResizeResponse {
    size: WindowSize;
  }

  /**
   * 监听窗口尺寸变化事件
   * 
   * @description
   * 有时，仅仅使用 media query 无法控制一些精细的布局变化。此时可以使用 js 作为辅助。

在 js 中读取页面的显示区域尺寸，可以使用 selectorQuery.selectViewport 。

页面尺寸发生改变的事件，可以使用 wx.onWindowResize 来监听。回调函数中将返回显示区域的尺寸信息。
   * @param callback 窗口尺寸变化事件的回调函数
   * @since 2.3.0
   * 
   * @example
```js
wx.onWindowResize(function(res) {
  res.size.windowWidth // 新的显示区域宽度
  res.size.windowHeight // 新的显示区域高度

  // 触发当前页面的 resized 方法
  var currentPages = getCurrentPages()
  var currentPage = currentPages[currentPages.length - 1]
  if (currentPage != null && typeof currentPage.resized === 'function') {
    currentPage.resized(res.size)
  }
})
```
   */
  function onWindowResize(
    callback: (res: OnWindowResizeResponse) => void
  ): void;

  /**
   * 取消监听窗口尺寸变化事件
   * @param callback 窗口尺寸变化事件的回调函数
   * @since 2.3.0
   */
  function offWindowResize(callback: Function): void;
}
