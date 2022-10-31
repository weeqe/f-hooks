export interface DebounceOptions {
  /** 等待时间 */
  wait?: number;
  /**是否在延迟开始前调用函数 */
  leading?: boolean;
  /** 是否在延迟开始后调用函数  */
  trailing?: boolean;
  /** 最大等待时间 ms */
  maxWait?: number;
}
