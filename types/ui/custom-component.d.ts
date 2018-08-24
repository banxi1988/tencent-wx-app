declare namespace wx {
  /**
   *  当在自定义组件中进行 triggerEvent、setData 等操作时可能会引起连锁同步操作，
   *  容易引发渲染错误，此接口可用于延迟一部分操作到下一个时间片再执行。
   * @param callback  Function
   * @since 2.2.3
   */
  function nextTick(callback: Function): void;
}
