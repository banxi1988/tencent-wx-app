// 设备-----iBeacon
declare namespace wx {
  interface StartBeaconOptions extends BaseOptions {
    /**
     * iBeacon设备广播的 uuids
     */
    uuids: string[];
    success?(ret: BaseResponse): void;
  }
  /**
   * 开始搜索附近的iBeacon设备
   */
  function startBeaconDiscovery(options: StartBeaconOptions): void;

  interface StopBeaconOptions extends BaseOptions {
    success?(ret: BaseResponse): void;
  }
  /**
   * 停止搜索附近的iBeacon设备
   */
  function stopBeaconDiscovery(options: StopBeaconOptions): void;

  interface Beacon {
    /**
     *  iBeacon 设备广播的 uuid
     */
    uuid?: string;

    /**
     * iBeacon 设备的主 id
     */
    major?: string;

    /**
     * iBeacon 设备的次 id
     */
    minor?: string;

    /**
     * 表示设备距离的枚举值
     */
    proximity: number;

    /**
     * iBeacon 设备的距离
     */
    accuracy: number;

    /**
     * 表示设备的信号强度
     */
    rssi: number;
  }

  interface GetBeaconsResponse extends BaseResponse {
    beacons: Beacon[];
  }
  interface GetBeaconsOptions extends BaseOptions {
    success?(ret: GetBeaconsResponse): void;
  }
  /**
   * 获取所有已搜索到的iBeacon设备
   */
  function getBeacons(options: GetBeaconsOptions): void;

  function onBeaconUpdate(callback: (beacons: Beacon[]) => void): void;
  interface OnBeaconServiceChangeResponse {
    /**
     * 服务目前是否可用
     */
    available: boolean;
    /**
     * 目前是否处于搜索状态
     */
    discovering: boolean;
  }
  function onBeaconServiceChange(
    callback: (res: OnBeaconServiceChangeResponse) => void
  ): void;
}
