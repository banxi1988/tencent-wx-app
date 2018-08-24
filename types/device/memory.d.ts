declare namespace wx {
  /**
     * TRIM_MEMORY_RUNNING_MODERATE = 5
TRIM_MEMORY_RUNNING_LOW = 10
TRIM_MEMORY_RUNNING_CRITICAL = 15
     */
  type MemoryWarningLevel = 5 | 10 | 15;

  interface OnMemoryWarningResponse {
    /**
     * 仅Android有该字段，对应系统内存告警等级宏定义
     */
    level: MemoryWarningLevel;
  }
  /**
   *
   * @param callback
   */
  function onMemoryWarning(
    callback: (res: OnMemoryWarningResponse) => void
  ): void;
}
