declare namespace wx {
  type LogArgType = object | number | any[] | string;
  interface LogManager {
    log(...args: LogArgType[]): void;
    info(...args: LogArgType[]): void;
    warn(...args: LogArgType[]): void;
    debug(...args: LogArgType[]): void;
  }

  /**
   * 获取日志管理器 logManager 对象。
   * logManager提供log、info、warn、debug四个方法写日志到文件，这四个方法接受任意个类型
   * 为Object/Array/Number/String的参数，每次调用的参数的总大小不超过100Kb。最多保存5M的
   * 日志内容，超过5M后，旧的日志内容会被删除。用户可以通过设置Button组件 的open-type为
   * feedback来上传打印的日志。用户上传的日志可以通过登录小程序管理后台后进入左侧菜单“客服反馈”
   * 页面获取到。
   * 基础库默认会把App、Page的生命周期函数和wx命名空间下的函数调用写入日志。
   *
   * @since 2.1.0
   */
  function getLogManager(): LogManager;
}
