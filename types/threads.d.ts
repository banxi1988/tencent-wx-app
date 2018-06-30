declare namespace wx {
  /**
     * Tips
1. Worker 最大并发数量限制为 1 个，创建下一个前请用 Worker.terminate() 结束当前 Worker
2. Worker 内代码只能 require 指定 Worker 路径内的文件，无法引用其它路径
3. Worker 的入口文件由 wx.createWorker() 时指定，开发者可动态指定 Worker 入口文件
4. Worker 内不支持 wx 系列的 API
5. Workers 之间不支持发送消息
     */
  interface Worker {
    /**
     * 向 Worker 线程发送的消息。
     * @param message
     */
    postMessage(message: PlainObject): void;

    /**
     * 监听 Worker 线程向当前线程发送的消息
     * @param callback
     */
    onMessage(callback: (message: PlainObject) => void): void;

    /**
     * 结束当前 Worker 线程，仅限在主线程 Worker 实例上调用。
     */
    terminate(): void;
  }

  /**
   * 在使用 createWorker 前，请查阅 多线程 文档了解基础知识和配置方法。
   * 
   * 一些异步处理的任务，可以放置于 Worker 中运行，待运行结束后，再把结果返回到小程序主线程。
   * Worker 运行于一个单独的全局上下文与线程中，不能直接调用主线程的方法。 Worker 与主线程
   * 之间的数据传输，双方使用 Worker.postMessage() 来发送数据，Worker.onMessage() 来接
   * 收数据，传输的数据并不是直接共享，而是被复制的。
   * 
   * 创建一个 Worker 线程，并返回 Worker 实例，目前限制最多只能创建一个 Worker，创建下一个
   *  Worker 前请调用 Worker.terminate。
   * @param scriptPath 为 worker 的入口文件路径，需填写绝对路径。
   * @since 1.9.90
   * @example
```js
// 运行以下代码需先进行基础配置，详细请查阅 多线程 文档了解基础知识和配置方法。
const worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径

worker.onMessage(function (res) {
  console.log(res)
})

worker.postMessage({
  msg: 'hello worker'
})

worker.terminate()
```
   */
  function createWorker(scriptPath: string): Worker;
}
